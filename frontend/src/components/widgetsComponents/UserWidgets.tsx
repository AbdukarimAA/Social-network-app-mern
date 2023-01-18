import {ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined} from "@mui/icons-material";
import {Box, Typography, Divider, useTheme} from "@mui/material";
import {UserImage} from "../UserImage";
import {WidgetWrapper} from "../Widgets";
import Flex from '../Flex';
import {useAppSelector, useAppDispatch} from "../../service/redux-hooks";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {addUser, getUser} from "../../service";

interface IUser {
    firstName: string,
    lastName: string,
    friends: string[],
    location: string,
    occupation: string,
    viewedProfile: number,
    impressions: number,
}

export const UserWidgets = ({userId, picturePath}: any) => {
    const [user, setUser] = useState<any>();
    const {palette} = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const token = useAppSelector((state) => state.users.token);
    const dark = palette.secondary.dark;
    const main = palette.secondary.main;
    console.log(userId)
    useEffect(() => {
        const res = axios.get(`http://localhost:4000/user/getUser/${userId}`,{
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(addUser({userId: userId}));
        setUser(res)
    }, []);

    console.log('User from userWidget => ', user);
    console.log(userId, 'UserId')
    console.log(user, 'user')

    if(!user) {
        return (<div>Loading...</div>)
    }

    const {firstName, lastName, location, occupation, viewedProfile, impressions, friends}: IUser = user;

    return (
        <WidgetWrapper>
            <Flex
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <Flex gap="1 rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            ml="10px"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer",
                                },
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={main} ml="15px">{friends} friends</Typography>
                    </Box>
                </Flex>
                <ManageAccountsOutlined />
            </Flex>

            <Divider />
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={main}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={main}>{occupation}</Typography>
                </Box>
            </Box>

            <Divider />
            <Box p="1 rem">
                <Flex mb="0.5 rem">
                    <Typography mt="20px" color={main}>Who's viewed your profile</Typography>
                    <Typography mt="20px" color={main} fontWeight="500">
                        {viewedProfile}
                    </Typography>
                </Flex>
                <Flex>
                    <Typography m="20px 0px 20px 0px" color={main}>Impressions of your post</Typography>
                    <Typography m="20px 0px 20px 0px" color={main} fontWeight="500">
                        {impressions}
                    </Typography>
                </Flex>
            </Box>

            <Divider/>
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                <Flex gap="1rem" mb="0.5rem">
                    <Flex gap="1rem">
                        <img src="https://img.icons8.com/color/32/twitter--v4.png" alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={main}>Social Network</Typography>
                        </Box>
                    </Flex>
                    <EditOutlined sx={{ color: main }} />
                </Flex>

                <Flex gap="1rem">
                    <Flex gap="1rem">
                        <img src="https://img.icons8.com/office/32/linkedin-circled--v2.png" alt="linkedin" />
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={main}>Network Platform</Typography>
                        </Box>
                    </Flex>
                    <EditOutlined sx={{ color: main }} />
                </Flex>
            </Box>
        </WidgetWrapper>
    )

};
