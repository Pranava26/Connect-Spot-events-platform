"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { eventFormSchema } from "@/lib/validator";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from "../../../constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";

const EventForm = ({ userId, type, event, eventId }) => {

    const [files, setFiles] = useState([]);

    const initialValues = event && type === 'Update' ? {...event, startDateTime: new Date(event.startDateTime), endDateTime: (new Date(event.endDateTime))} : eventDefaultValues;

    const { startUpload } = useUploadThing('imageUploader')

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    })

    // 2. Define a submit handler.
    async function onSubmit(values) {

        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files);

            if (!uploadedImages) {
                return;
            }

            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === 'Create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                })

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }

            } catch (error) {
                console.log(error);
            }
        }

        if (type === 'Update') {
            if(!eventId){
                router.back();
                exit();
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/events/${eventId}`
                })

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`)
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Event title" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown onChangeHandler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[55px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image src="/assets/icons/location-grey.svg" alt="calendar" width={24} height={24} />
                                        <Input placeholder="Event Location or Online" {...field} className="input-field" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                        <Image
                                            src="/assets/icons/calendar.svg"
                                            alt="calendar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                    <Image
                                        src="/assets/icons/link.svg"
                                        alt="link"
                                        width={24}
                                        height={24}
                                    />
                                    <Input placeholder="URL" {...field} className="input-field" />
                                </div>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button size="lg" disabled={form.formState.isSubmitting} className="button col-span-2 w-full" type="submit">{form.formState.isSubmitting ? "Submitting..." : `${type} Event`}</Button>
            </form>
        </Form>
    )
}

export default EventForm
