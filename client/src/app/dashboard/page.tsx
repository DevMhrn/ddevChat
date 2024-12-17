import DashNav from '@/components/dashboard/DashNav';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/option';

async function dashboard() {
    const session:CustomSession|null = await getServerSession(authOptions);
  return (
    <div>
        <DashNav user={{ name: session?.user?.name || "?", image: session?.user?.image || "" }} />
    </div>
  )
}

export default dashboard; 