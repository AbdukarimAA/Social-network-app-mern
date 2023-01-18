import { Typography, useTheme } from "@mui/material";
import Flex from "../Flex";
import {WidgetWrapper} from "../Widgets";

export const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.secondary.dark;
    const main = palette.secondary.main;

    return (
        <WidgetWrapper>
            <Flex>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={main}>Create Ad</Typography>
            </Flex>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src="http://localhost:3001/assets/info4.jpeg"
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <Flex>
                <Typography color={main}>Abdukarim</Typography>
                <Typography color={main}>Abdukarim</Typography>
            </Flex>
            <Typography color={main} m="0.5rem 0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus distinctio, ducimus eos est facere
            </Typography>
        </WidgetWrapper>
    )
};