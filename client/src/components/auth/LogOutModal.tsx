"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { SetStateAction } from "react";
import { signOut } from "next-auth/react";
import { Dispatch } from "react";

  function LogOutModal({
    open,
    setOpen
  }: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) {

    const handleLogout = async () => {
        await signOut({
            callbackUrl: "/",
            redirect: true,
        });
        setOpen(false);
    }
    return (

        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will log you out of your account.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>


    )
  }

export default LogOutModal;