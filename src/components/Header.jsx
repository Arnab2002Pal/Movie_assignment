import { Box, Typography, Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
const location = useLocation();

const isScreenActive = (path) => {
    return location.pathname === path;
};

    return (
        <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10vh"
        sx={{
            background: "#6F5643",
            color: "white"
        }}
        >
            <Typography
                fontSize={30} width="100%" align="center" fontFamily="Righteous" fontWeight="bold" letterSpacing={3} mt="8px"
                sx={{
                    background: "#CC6B49"
                }}
            >
                INTERNSHIP TEST
            </Typography>
            
            
        </Stack>
    );
};

export default Header;