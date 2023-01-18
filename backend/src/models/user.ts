import * as mongoose from "mongoose";
import {Schema} from "mongoose";

const UserSchema = new Schema<IUserSchema>({
    firstName: {type: String, required: true, min: 2, max: 50},
    lastName: {type: String, required: true, min: 2, max: 50},
    email: {type: String, required: true, unique: true, max: 50,},
    password: {type: String, required: true, min: 5,},
    picturePath: {type: String, default: ""},
    friends: {type: [], default: []},
    location: {type: String, default: "Moscow", min: 3,},
    occupation: {type: String, default: "Working on Project", min: 2,},
    viewedProfile: {type: Number},
    impressions: {type: Number},
}, {timestamps: true});

export interface IUserSchema extends mongoose.Document{
    _id?: string,
    firstName: string,
    lastName: string,
    friends: string[],
    email: string,
    password: string,
    picturePath: string,
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number,
}

const User = mongoose.model("User", UserSchema);
export default User;