import express, {Request, Response} from "express";
import Post, {IPostController} from "../models/post.js";
import User, {IUserSchema} from "../models/user.js";

export async function createPost(req: Request, res: Response) {
    try {
        const {userId, picturePath, description} = req.body;
        const user: IUserSchema = await User.findById(userId);
        const posts: IPostController = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        });
        await posts.save();
        const post = await Post.find();
        res.status(201).json(post);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function getPosts(req: Request, res: Response) {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function getUserPosts(req: Request, res: Response) {
    try {
        const {userId} = req.params
        const post = await Post.find({userId});
        res.status(200).json(post);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}

export async function likePosts(req: Request, res: Response) {
    try {
        const {id} = req.params
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);
        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, {likes: post.likes}, {new: true});

        res.status(200).json(updatedPost);
    } catch (e: any) {
        res.status(404).json({error: e.message});
    }
}