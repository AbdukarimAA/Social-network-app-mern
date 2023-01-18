import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {useAppDispatch} from "./redux-hooks";
import {useNavigate} from "react-router-dom";
import {getUserHandle, login, registration} from "./api/userApi";

export interface IUserSchema {
    _id: string,
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

const userType: IUserSchema = {
    _id: "",
    firstName: "",
    lastName: "",
    friends: [""],
    email: "",
    password: "",
    picturePath: "",
    location: "",
    occupation: "",
    viewedProfile: 0,
    impressions: 0,
}

interface IInitialState {
    user: IUserSchema,
    token: string | null,
    theme: string,
    posts: any[]
}

const initialState: IInitialState = {
    user: userType,
    token: null,
    theme: "light",
    posts: []
};

export const authRegister = createAsyncThunk(
    'auth/userRegister',
    async function({email, password, firstName, lastName, picturePath, location, occupation}: any, {rejectWithValue, dispatch}: any) {
        try {
            // const res = await axios.post('http://localhost:4000/auth/registration',{email, password, firstName, lastName, picturePath, location, occupation})
            // dispatch(addUser(res.data))
            let res = await registration(email, password, firstName, lastName, picturePath, location, occupation);
            console.log('Register Request Data => ', res)
            return res;
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async function({email, password}: any, {rejectWithValue, dispatch}: any) {
        try {
            // const res = await axios.post('http://localhost:4000/auth/login',{user, token})
            // dispatch(addUser(res.data))
            let res = await login(email, password);
            console.log('Login Request Data => ', res)
            return res;
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const getUser = createAsyncThunk(
    'user/getUser',
    async function ({userId}: any, {rejectWithValue, dispatch}: any) {
        try {
            // const dispatch = useAppDispatch();
            // const res = await axios.get(`http://localhost:4000/user/getUser/${userId}`,{
            //     headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            // })
            // dispatch(addUser(res.data))
            let res = await getUserHandle(userId);
            // dispatch(addUser({userId: userId}));
            console.log('getUser Request Data => ', res)
            return res;
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const addRemoveFriend = createAsyncThunk(
    'user/addRemoveFriend',
    async function ({id, friendId}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const res = await axios.put(`http://localhost:4000/user/addRemoveFriend/${id}/${friendId}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            // dispatch(addUser(res.data))
            dispatch(setFriends({ friends: res.data }));
            console.log('addRemoveFriend Request Data => ', res);
            console.log('addRemoveFriend Request => ', res.data);
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const getUserFriend = createAsyncThunk(
    'user/getUserFriend',
    async function ({userId}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const res = await axios.get(`http://localhost:4000/user/getUserFriends/${userId}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            // dispatch(addUser(res.data))
            dispatch(setFriends({friends: res.data}))
            console.log('GetUserFriend Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const addPost = createAsyncThunk(
    'post/addPost',
    async function({id, post, image}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const formData = new FormData();
            formData.append("userId", id);
            formData.append("description", post);
            if (image) {
                formData.append("picture", image);
                formData.append("picturePath", image.name);
            }

            const res = await axios.post(`http://localhost:4000/posts`,{formData}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            // dispatch(addUser(res.data))
            dispatch(setPosts({posts: res.data}));
            console.log('addPost Request Data => ', res);
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const getPost = createAsyncThunk(
    'post/getPost',
    async function ({}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const res = await axios.get(`http://localhost:4000/posts/getPosts`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            // dispatch(addUser(res.data))
            dispatch(setPosts({posts: res.data}));
            console.log('getPost Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const getUserPosts = createAsyncThunk(
    'post/getUserPosts',
    async function ({userId, token}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const res = await axios.get(`http://localhost:4000/posts/getUserPosts/${userId}`,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            // dispatch(addUser(res.data))
            dispatch(setPosts({posts: res.data}));
            console.log('getUserPosts Request Data => ', res)
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);

export const postInteraction = createAsyncThunk(
    'post/postInteraction',
    async function ({id, postId, token}: any, {rejectWithValue, dispatch}: any) {
        try {
            const dispatch = useAppDispatch();
            const res = await axios.put(`http://localhost:4000/posts/likePost/${postId}`, {id}, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            // dispatch(addUser(res.data))
            dispatch(setPost({ post: res.data }));
            console.log('postInteraction Request Data => ', res);
            console.log('postInteraction Request => ', res.data);
            return res.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
);



export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
        addUser(state, action: PayloadAction<any>) {
            state.user = action.payload.user;
            // state.token = action.payload.token;
        },
        setUser(state, action: PayloadAction<any>) {
            state.user._id = action.payload.user._id;
            // state.token = action.payload.token;
        },
        setLogOut: (state) => {
            // state.user = null;
            state.token = null;
        },
        setPosts: (state, action: PayloadAction<any>) => {
            state.posts = action.payload.posts;
        },
        setFriends: (state, action: PayloadAction<any>) => {
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent");
            }
        },
        setPost: (state, action: PayloadAction<any>) => {
            state.posts = state.posts.map((post: any) => {
                if(post._id === action.payload.post.id) return action.payload.post;
                return post;
            });
        }
    }
});

export const {setFriends, setPost, setPosts, setLogOut, addUser, setTheme, setUser} = authSlice.actions;
export default authSlice.reducer;