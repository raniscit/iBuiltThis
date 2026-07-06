"use client"
import { Button } from '../ui/button';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { approveProductAction, rejectProductAction } from '@/lib/admin/admin-action';
import { products } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

type Product = InferSelectModel<typeof products>

const AdminAction = ({ status,productId }: { status: string; productId: Product["id"] }) => {

  const handleApprove = async() => {
    await approveProductAction(productId);
  }

  const handleReject = async() => {
    await rejectProductAction(productId);

  }

  
  return (
    <div className='space-y-2'>
      {status === "pending" && (
        <div className='flex gap-2'>
          <Button variant={"outline"} 
          className={"border-green-400 text-green-400  hover:bg-green-100 hover:cursor-pointer" } onClick={() => {handleApprove()}}>
            <CheckCircleIcon className='size-4' />
            Approve
          </Button>
          <Button variant={"outline"} className={"border-red-400 text-red-400 hover:bg-red-100 hover:cursor-pointer"} onClick={() => {handleReject()}}>
            <XCircleIcon className='size-4'/>
            Reject
          </Button>
        </div>
      )}

      {status === "approved" && (
        <div>
          <Badge variant={"approved"}>Approved</Badge>
        </div>
      )}
      {status === "rejected" && (
        <div>
          <Badge variant={"rejected"}>Rejected</Badge>
        </div>
      )}
    </div>
  )
}

export default AdminAction;