import {useEffect, useState } from "react";
import {Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useMediaQuery, useTheme} from "@mui/material";
import {Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close} from "@mui/icons-material";
import {useAppSelector, useAppDispatch} from "../service/redux-hooks";
import {setTheme, setLogOut, addUser} from "../service";
import {useNavigate} from "react-router-dom";
import Flex from "./Flex";

export const Navbar = (userId: any) => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.users.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const token = useAppSelector((state) => state.users.token);
    userId = user;
    const theme = useTheme();
    const neutralLight = theme.palette.secondary.light;
    const dark = theme.palette.secondary.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const primaryDark = theme.palette.primary.dark;
    const backgroundPaper = theme.palette.background.paper;
    const fullName = `${userId!.firstName} ${userId!.lastName}`;
    console.log(fullName);

    return <Flex padding="1rem 6%" backgroundColor={background}>
        <Flex gap="1.75rem">
            <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                onClick={() => navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                }}>
                AAASocial
            </Typography>
            {isNonMobileScreens && (
                <Flex
                    backgroundColor={neutralLight}
                    borderRadius="9px"
                    gap="3rem"
                    padding="0.1rem 1.5rem"
                >
                    <InputBase placeholder="Search" />
                    <IconButton>
                        <Search />
                    </IconButton>
                </Flex>
            )}
        </Flex>

        {isNonMobileScreens ? (
            <Flex gap="2 rem">
                <IconButton onClick={() => dispatch(setTheme())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                </IconButton>
                <Message sx={{ fontSize: "25px", marginLeft: "15px" }} />
                <Notifications sx={{ fontSize: "25px", marginLeft: "15px" }} />
                <Help sx={{ fontSize: "25px", marginLeft: "15px", marginRight: "15px" }} />
                <FormControl variant="standard">
                    <Select
                        value={fullName}
                        sx={{
                            backgroundColor: neutralLight,
                            width: "225px",
                            borderRadius: "0.25rem",
                            p: "0.25rem 1rem",
                            "& .MuiSvgIcon-root": {
                                pr: "0.25rem",
                                width: "3rem",
                            },
                            "& .MuiSelect-select:focus": {
                                backgroundColor: neutralLight,
                            },
                        }}
                        input={<InputBase />}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => dispatch(setLogOut())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
            </Flex>
        ) : (
            <IconButton  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Menu />
            </IconButton>
        )}

        {!isNonMobileScreens && isMobileMenuToggled && (
            <Box position="fixed" right="0" bottom="0" height="100%" zIndex="10" maxWidth="500px" minWidth="300px" sx={{
                backgroundColor: {background}
            }}>
                <Box display="flex" justifyContent="flex-end" p="1rem">
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Close />
                    </IconButton>
                </Box>
                <Flex display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                    <IconButton
                        onClick={() => dispatch(setTheme())}
                        sx={{ fontSize: "25px" }}
                    >
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl sx={{variant: "standard", value: {fullName}}}>
                        <Select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLight,
                                },
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogOut())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Flex>
            </Box>
        )}
    </Flex>
};