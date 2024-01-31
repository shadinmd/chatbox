"use client"
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

const Forgot = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<formType>({ resolver: zodResolver(formSchema) })

    const onSubmit = (data: formType) => {
        try {
            console.log(data)
        } catch (error) {
            if (isAxiosError(error))
                if (error.response?.data.message)
                    toast.error(error.response.data.message)
                else
                    toast.error(error.message)
            else
                toast.error("something went wrong")
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-between text-white w-screen h-screen bg-chat-black">
            <Navbar />
            <div className='flex flex-col h-full w-full gap-10 pb-10 items-center justify-center'>
                <div className="flex flex-col gap-5 items-center justify-center">
                    <p className='text-5xl font-bold'>Forgot password?</p>
                    <p>
                        Enter your email here to recieve a link for resetting your password
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col gap-2 items-center justify-center'
                >
                    <input
                        {...register("email")}
                        placeholder='Email'
                        className="rounded-lg text-black px-2 py-2 focus:outline-none w-full"
                        type="text"
                    />
                    {errors.email && <p className='text-chat-red'>{errors.email.message}</p>}
                    <button className='rounded-lg font-bold px-2 py-2 w-full bg-black' type='submit'>
                        Send
                    </button>
                    <Link href={"/app/login"}>
                        go back to login ?
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Forgot

const formSchema = z.object({
    email: z.string().email({ message: "enter a valid email" })
})

type formType = z.infer<typeof formSchema>
