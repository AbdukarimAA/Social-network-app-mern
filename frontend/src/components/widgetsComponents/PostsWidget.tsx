import {useEffect} from "react";
import {useAppSelector, useAppDispatch} from "../../service/redux-hooks";
import {getPost, getUserPosts, setPosts} from "../../service";
import {PostWidget} from './PostWidget';

export interface IUserPost {
    _id: string,
    userId: string,
    firstName: string,
    lastName: string,
    description: string,
    location: string,
    picturePath: string,
    userPicturePath: string,
    likes: string,
    comments: string
}

export const PostsWidget = ({ userId = '', isProfile = false }) => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.users.posts);
    const token = useAppSelector((state) => state.users.token);

    // const getPosts = async () => {
    //     const res = await fetch('http://localhost:4000/posts/getPosts', {
    //         method: "GET",
    //         headers: {Authorization: `Bearer ${token}`}
    //     });
    //     const data = await res.json();
    //     dispatch(setPosts({posts: data}));
    // };
    //
    // const getUserPosts = async () => {
    //   const res = await fetch(`http://localhost:4000/posts/getUserPosts/${userId}`, {
    //       method: "GET",
    //       headers: {Authorization: `Bearer ${token}`}
    //   });
    //   const data = res.json();
    //   dispatch(setPosts({posts: data}));
    // };

    useEffect(() => {
        if(isProfile) {
            getUserPosts({userId, token});
        } else {
            getPost({token});
        }
    }, [])

    return (
        <>
            {posts.map(({_id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments}: IUserPost) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                ))
            }
        </>
    )
}