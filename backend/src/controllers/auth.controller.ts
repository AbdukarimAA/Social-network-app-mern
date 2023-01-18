import express, {Request, Response} from "express";
import jwt from "jsonwebtoken";
const { sign, decode, verify } = jwt;
import bcrypt from "bcrypt";
import User, {IUserSchema} from "../models/user.js";


export async function registration (req: Request, res: Response){
    try {
        const {firstName, lastName, email, password, picturePath, friends, location, occupation}: IUserSchema = req.body;
        if (!email || !password) {
            return res.status(500).json({message: 'Enter email or password'})
        }
        const candidate = await User.findOne({email: email })
        if (candidate) {
            return res.status(500).json({message: 'user already exists'})
        }
        console.log(password)
        const hashPassword = await bcrypt.hash(password, 6)
        // const salt = await bcrypt.genSalt();
        // const hashPassword = await bcrypt.hash(password, salt);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await user.save();
        console.log(savedUser)
        const token = jwt.sign(
            {
                id: user._id, firstName: user.firstName, lastName: user.lastName,
                email: user.email, picturePath: picturePath, friends: friends, location: user.location, occupation: user.occupation
            },
            process.env.SECRET_KEY as string
        );
        res.status(201).json({token});

    }catch (e: any) {
        res.status(500).json({error: e.message});
    }
}
export async function login (req: Request, res: Response) {
    try {
        const {email, password}: IUserSchema = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "user does not exist"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "invalid credentials"});

        const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_KEY as string);
        // delete user.password;
        res.status(200).json({token});

    } catch (e: any) {
        res.status(500).json({error: e.message});
    }
}
