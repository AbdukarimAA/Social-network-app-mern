import {ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Flex from "../Flex";
import {Friend} from "../Friend";
import {WidgetWrapper} from '../Widgets';
import {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../service/redux-hooks";
import {postInteraction, setPost} from "../../service";

export const PostWidget = ({postId, postUserId, name, description, location, picturePath, userPicturePath, likes, comments}: any) => {
    const [isComments, setIsComments] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.users.token);
    const loggedInUserId = useAppSelector((state) => state!.users!.user!._id);
    const isLiked = Boolean(likes[loggedInUserId!]);
    const likeCount = Object.keys(likes).length;
    const {palette} = useTheme();
    const mainTheme = palette.secondary.main;
    const primaryTheme = palette.primary.main;

    // const handleLikes = async () => {
    //     const res = await fetch(`http://localhost:4000/posts/likePost/${postId}`, {
    //         method: "PATCH",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify({userId: loggedInUserId})
    //     })
    //     const updatedPost = await res.json();
    //     dispatch(setPost({post: updatedPost}));
    // };
    //61
    useEffect(() => {
        postInteraction({loggedInUserId, postId, token})
    }, [])

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={mainTheme} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <Flex mt="0.25rem">
                <Flex gap="1rem">
                    <Flex gap="0.3rem">
                        <IconButton onClick={postInteraction}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primaryTheme }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </Flex>

                    <Flex gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </Flex>
                </Flex>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </Flex>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment: any, i: any) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: mainTheme, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};