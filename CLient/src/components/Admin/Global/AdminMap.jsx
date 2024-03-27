import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import India from "@react-map/india"
import { ColorModeContext, tokens, useMode } from '../theme'

const AdminMapChart = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);


    return (
        <India
            size={190}
            mapColor="#b7ebde"
            hoverColor="#4cceac"
            onSelect={() => console.log("select")}
        />
    );
};

export default AdminMapChart;
