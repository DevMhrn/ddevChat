"use client";
import React, { Suspense, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar';

import dynamic from 'next/dynamic';

const LogOutModal = dynamic(() => import('./LogOutModal'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});
  

function ProfileMenu({name, image}:{name:string, image?:string}) {

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  return (
    <>
        {logoutModalOpen && <Suspense fallback={<div>Loading...</div>}><LogOutModal open={logoutModalOpen} setOpen={setLogoutModalOpen} /></Suspense>}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar name={name} image={image} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                
                    <DropdownMenuItem onClick={() => setLogoutModalOpen(true)} className='cursor-pointer' >Logout</DropdownMenuItem>
                </DropdownMenuContent>
                
            </DropdownMenu>
    </>

  )
}

export default ProfileMenu