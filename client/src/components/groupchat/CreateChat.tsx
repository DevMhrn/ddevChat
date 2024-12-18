"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { CreateChatSchemaType, createChatSchema } from '@/validations/groupChatValidation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CustomUser } from '@/app/api/auth/[...nextauth]/option';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints';


  
function CreateChat({user} : {user : CustomUser}) {
    // console.log(user);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState : {errors}} = useForm<CreateChatSchemaType>({
        resolver : zodResolver(createChatSchema),
    });
    const onSubmit = async (payload : CreateChatSchemaType ) => {
        
        try {
            setLoading(true);
            const {data} = await axios.post(CHAT_GROUP_URL, {
                ...payload,
                userId : user.id 
            },{
                headers : {
                    Authorization : user.token
                }
            });
            if(data.success) {
                setLoading(false);
                setOpen(false);
                toast.success(data.message);
            }
            else {
                setLoading(false);
                toast.error(data.message);
            }
        } catch (error) {
            setLoading(false);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
            else {
                toast.error("Something went wrong, please try again later");
            }
        }

        
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Chat</Button>
            </DialogTrigger>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Create your new Chat</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-4 flex flex-col gap-2'>
                    <Input {...register('title')} placeholder='Enter Chat Title' />
                    <span className='text-red-500'>{errors.title?.message}</span>
                    
                </div>
                <div className='mt-4 flex flex-col gap-2'>
                    <Input {...register('passcode')} placeholder='Enter Chat Passcode' />
                    <span className='text-red-500'>{errors.passcode?.message}</span>
                </div>
                <div className='mt-4 flex justify-end'>
                    <Button type='submit' disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
                </div>
            </form>
          </DialogContent>
        </Dialog>
      );
}

export default CreateChat;