import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {useAppSelector, useAppDispatch} from "../service/redux-hooks";
import { useNavigate } from "react-router-dom";
import {addRemoveFriend, setFriends} from "../service";
import Flex from "./Flex";
import {UserImage} from "./UserImage";
import {useEffect} from "react";

export const Friend = ({ friendId, name, subtitle, userPicturePath }: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const id = useAppSelector((state) => state!.users!.user!._id);
    console.log(id)
    // const id_: any = id!._id
    const token = useAppSelector((state) => state.users.token);
    const friends = useAppSelector((state) => state!.users!.user!.friends);
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.secondary.main;

    const isFriend = friends!.find((friend: any) => friend.id === friendId);

    useEffect(() => {
        addRemoveFriend({id, friendId, token})
    }, [])

    // const handleFriend = async () => {
    //     const res = await fetch(
    //         `http://localhost:4000/user/addRemoveFriend/${id}/${friendId}`,
    //         {
    //             method: "PUT",
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     );
    //     const data = await res.json();
    //     dispatch(setFriends({ friends: data }));
    // };

    return (
        <Flex>
            <Flex gap="1rem">
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={main} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </Flex>
            <IconButton
                onClick={() => addRemoveFriend({id, friendId, token})}
                sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </Flex>
    );
};