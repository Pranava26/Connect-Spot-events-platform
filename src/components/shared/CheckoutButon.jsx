"use client";
import { useSession } from 'next-auth/react';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Checkout from './Checkout';

const CheckoutButon = ({event}) => {

    const { data: session, status } = useSession();
    const userId = session?.user.id;

    const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className='flex items-center gap-3'>
      {/* Cannot buy past events */}
      {hasEventFinished ? (
        <p className='p-2 text-red-400'>Sorry, tickets are no longer available</p>
      ): (
        <>
        {status === "unauthenticated" && (
            <Button asChild className="button rounded-full" size="lg" >
                <Link href={"/sign-in"} >Get Tickets</Link>
            </Button>
        )}
        {status === "authenticated" && (
            <Checkout event={event} userId={userId} />
        )}
        </>
      )}
    </div>
  )
}

export default CheckoutButon
