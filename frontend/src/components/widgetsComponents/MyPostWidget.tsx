import {EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined} from "@mui/icons-material";
import {Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery} from "@mui/material";
import Dropzone from "react-dropzone";
import {UserImage} from "../UserImage";
import {WidgetWrapper} from "../Widgets";
import {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../service/redux-hooks";
import {addPost, authRegister, setPosts} from "../../service";
import {unwrapResult} from "@reduxjs/toolkit";
import Flex from "../Flex";

export const MyPostWidget = ({picturePath}: any) => {
    const dispatch = useAppDispatch();
    const [isImage, setIsImage] = useState<boolean>(false);
    const [image, setImage] = useState<any | null>(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const id = useAppSelector((state) => state.users.user);
    const id_: any = id!._id
    // const {_id} = useAppSelector((state) => state.users)
    const token = useAppSelector((state) => state.users.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mainTheme = palette.secondary.main;
    //148
     useEffect(() => {
        addPost({id_, token, post, image});
        setImage(null);
        setPost("");
    }, [])

    // const handlePost = async () => {
    //     const formData = new FormData();
    //     formData.append("userId", id_);
    //     formData.append("description", post);
    //     if (image) {
    //         formData.append("picture", image);
    //         formData.append("picturePath", image.name);
    //     }
    //
    //     const response = await fetch(`http://localhost:4000/posts`, {
    //         method: "POST",
    //         headers: { Authorization: `Bearer ${token}` },
    //         body: formData,
    //     });
    //     const posts = await response.json();
    //     dispatch(setPosts({ posts }));
    //     setImage(null);
    //     setPost("");
    // };

    return (
        <WidgetWrapper>
            <Flex gap="1.5rem">
                <UserImage image={picturePath ?? " "} />
                <InputBase
                    placeholder="What's on your mind..."
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.secondary.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </Flex>
            {isImage && (
                <Box
                    border={`1px solid ${mainTheme}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <Flex>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <Flex>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </Flex>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutlined />
                                    </IconButton>
                                )}
                            </Flex>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <Flex>
                <Flex gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mainTheme }} />
                    <Typography
                        color={mainTheme}
                        sx={{ "&:hover": { cursor: "pointer", color: mainTheme } }}
                    >
                        Image
                    </Typography>
                </Flex>

                {isNonMobileScreens ? (
                    <>
                        <Flex gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mainTheme }} />
                            <Typography color={mainTheme}>Clip</Typography>
                        </Flex>

                        <Flex gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mainTheme }} />
                            <Typography color={mainTheme}>Attachment</Typography>
                        </Flex>

                        <Flex gap="0.25rem">
                            <MicOutlined sx={{ color: mainTheme }} />
                            <Typography color={mainTheme}>Audio</Typography>
                        </Flex>
                    </>
                ) : (
                    <Flex gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mainTheme }} />
                    </Flex>
                )}
                <Button
                    disabled={!post}
                    onClick={addPost}
                    sx={{
                        color: palette.background.paper,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </Flex>
        </WidgetWrapper>
    )
}