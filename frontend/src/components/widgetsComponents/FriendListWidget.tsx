import { Box, Typography, useTheme } from "@mui/material";
import {Friend} from "../Friend";
import {WidgetWrapper} from "../Widgets";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../service/redux-hooks";
import {getUserFriend} from "../../service";

export const Friends = ({userId}: any) => {
    const dispatch = useAppDispatch();
    const { palette } = useTheme();
    const token = useAppSelector((state) => state.users.token);
    const friends = useAppSelector((state) => state!.users!.user!.friends);

    useEffect(() => {
        getUserFriend({userId, token});
    }, []);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.secondary.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend: any) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
};