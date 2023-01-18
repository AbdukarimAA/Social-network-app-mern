import {Box, useMediaQuery} from "@mui/material";
import {Navbar} from "../../components/Navbar";
import {useAppDispatch, useAppSelector} from "../../service/redux-hooks";
import { UserWidgets } from "components/widgetsComponents/UserWidgets";
import { MyPostWidget } from "components/widgetsComponents/MyPostWidget";
import {Friends} from "../../components/widgetsComponents/FriendListWidget";
import { PostsWidget } from "components/widgetsComponents/PostsWidget";
import { AdvertWidget } from "components/widgetsComponents/AdvertWidget";
import {useEffect, useState} from "react";
import {addUser, setUser} from "../../service";

export const HomePage = () => {
    const [users, setUsers] = useState<any>(null);
    const dispatch = useAppDispatch();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const {user} = useAppSelector((state) => state.users);
    // const {_id} = useAppSelector((state) => state.users.user);
    // const token = useAppSelector((state) => state.users.token);
    console.log(user.picturePath)
    console.log(user._id)
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(`http://localhost:4000/user/getUser/63c6dfc6759741f162a5ccc5`, {
                method: "GET",
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            const data = res.json();
            setUsers(data)
            dispatch(setUser({userId: user._id}));
        };
    }, []);

  return (
      <Box>
          <Navbar user={users}/>
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreen ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
              <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                  <UserWidgets userId={user._id} picturePath={user.picturePath} />
              </Box>
              {/*<Box*/}
              {/*    flexBasis={isNonMobileScreen ? "42%" : undefined}*/}
              {/*    mt={isNonMobileScreen ? undefined : "2rem"}*/}
              {/*>*/}
              {/*    <MyPostWidget picturePath={picturePath} />*/}
              {/*    /!*<PostsWidget userId={user_Id} />*!/*/}
              {/*</Box>*/}
              {/*{isNonMobileScreen && (*/}
              {/*    <Box flexBasis="26%">*/}
              {/*        <AdvertWidget />*/}
              {/*        <Box m="2rem 0" />*/}
              {/*        <Friends userId={user_Id} />*/}
              {/*    </Box>*/}
              {/*)};*/}
          </Box>
      </Box>
  );
};