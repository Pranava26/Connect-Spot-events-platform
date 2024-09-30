import { connectToDatabase } from "../../../../../lib/database";
import User from "../../../../../lib/database/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connectToDatabase()

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        return NextResponse.json({message: "User registered successfully", success: true, savedUser})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}