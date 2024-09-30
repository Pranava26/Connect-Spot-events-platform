import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions";
import { getServerSession } from "next-auth";

const UpdateEvent = async ({params: {id}}) => {

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const event = await getEventById(id);

    return (
        <>
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <h3 className='wrapper h3-bold text-center sm:text-left'>Update Event</h3>
            </section>

            <div className='wrapper my-8'>
                <EventForm userId={userId} type="Update" event={event} eventId={event._id} />
            </div>
        </>
    )
}

export default UpdateEvent
