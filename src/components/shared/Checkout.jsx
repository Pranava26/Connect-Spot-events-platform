"use client";
import React from 'react'
import { Button } from '../ui/button'
import { createOrder } from '@/lib/actions/order.actions'
import { useRouter } from 'next/navigation'

const Checkout = ({ event, userId }) => {

    const router = useRouter();

    const onCheckout = async (e) => {
        e.preventDefault();
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            buyerId: userId
        }

        const res = await createOrder(order);
        if(res.event !== ''){
            router.push('/profile');
        }
        
    }

    return (
        <form onSubmit={onCheckout}>
            <Button type="submit" role="link" size="lg" className="button sm:w-fit" >
                Buy Ticket
            </Button>
        </form>
    )
}

export default Checkout
