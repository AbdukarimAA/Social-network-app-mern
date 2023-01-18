import express, {Request, Response} from "express";
import User, {IUserSchema} from "../models/user.js";
import bcrypt from "bcrypt";
import {Model} from "mongoose";
import user from "../models/user.js";

export async function getUser(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function getAllUsers (req: Request, res: Response) {
    const query = req.query.limit
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(404).json({error: err.message});
    }
}

// interface Data {
//     _id: string,
//     firstName: string,
//     lastName: string,
//     picturePath: string,
//     location: string,
//     occupation: string
// }
export async function getUserFriends(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const user: IUserSchema = await User.findById(id);
        const friends = await Promise.all(user.friends.map((id: string) => User.findById(id)));
        const handleFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }: IUserSchema) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })
        res.status(200).json(handleFriends);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function addRemoveFriend(req: Request, res: Response) {
    try {
        const {id, friendId} = req.params;
        const user: IUserSchema = await User.findById(id);
        const friend: IUserSchema = await User.findById(friendId);

        let typedUser: string[] = user.friends;
        let typedFriend: string[] = friend.friends;

        if(typedUser.includes(friendId)) {
            user.friends = typedUser.filter((id: string) => id !== friendId);
            friend.friends = typedFriend.filter((id: string) => id !== id);

        } else {
            typedUser.push(friendId);
            typedFriend.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(user.friends.map((id: string) => User.findById(id)));
        const handleFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }: IUserSchema) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })
        res.status(200).json(handleFriends);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
       const user = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body,
       }, {new: true});

        res.status(200).json(user);

    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function deleteUser(req: Request, res: Response) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (err: any) {
        res.status(404).json({error: err.message});
    }
}

export async function dateCreated(req: Request, res: Response) {
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err: any) {
        res.status(404).json({error: err.message});
    }
}

export async function changePassword(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const userPassword = await User.findByIdAndUpdate({_id: id}, {password: password}, {new: true});
        return res.status(200).json({status: true, data: userPassword});
    } catch (err: any) {
        res.status(404).json({error: err.message});
    }
}