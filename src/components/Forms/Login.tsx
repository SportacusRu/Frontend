"use client"
import { Client } from "@/client";
import { FormEvent } from "react";


export default function Login() {

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await Client.auth.login(e.currentTarget.email.value, e.currentTarget.password.value)
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    )
}