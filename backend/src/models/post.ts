import * as mongoose from "mongoose";
import {Schema} from "mongoose";


const PostSchema = new Schema<IPostController>({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: { type: Map, of: Boolean },
    comments: { type: [], default: [] },
}, {timestamps: true});

export interface IPostController extends mongoose.Document{
    userId?: string,
    firstName: string,
    lastName: string,
    location: string,
    description: string,
    userPicturePath: string,
    picturePath: string,
    likes: Map<string, boolean>,
    comments: []
}

const post = mongoose.model("Post", PostSchema);
export default post;