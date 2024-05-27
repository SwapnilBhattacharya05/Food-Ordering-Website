import React from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import India from "@react-map/india";
import { ColorModeContext, tokens, useMode } from '../theme';
import toastMessage from "../../ToastMessage";

const AdminMapChart = () => {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    const handleStateSelect = (state) => {
        console.log("Selected state:", state);
        toastMessage({ msg: `Selected state: ${state}`, type: "info" });
    };

    return (
        <div>
            <India
                size={190}
                mapColor="#b7ebde"
                hoverColor="#4cceac"
                onSelect={handleStateSelect}
            />
        </div>
    );
};

export default AdminMapChart;
