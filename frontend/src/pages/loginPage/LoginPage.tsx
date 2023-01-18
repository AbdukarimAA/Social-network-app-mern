import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import {Form} from "./Form";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const colorBackground: any = theme.palette.background.paper;
    return (
        <Box>
            <Box width="100%" p="1rem 6%" textAlign="center" sx={{
                backgroundColor: {colorBackground}
            }}>
                <Typography
                    fontWeight="bold"
                    fontSize="32px"
                    color="primary"
                >
                    AAASocial
                </Typography>
            </Box>
            <Box width={isNonMobileScreen ? "50%" : "93%"} p="2rem" m="2rem auto" borderRadius="1.5rem" sx={{
                backgroundColor: {colorBackground}
            }}>
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to AAASocial, the Social Media for everyone!
                </Typography>
                <Form />
            </Box>
        </Box>
    )
};