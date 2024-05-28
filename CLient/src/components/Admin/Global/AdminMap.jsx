import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import India from "@react-map/india";
import { tokens, useMode } from '../theme';

const AdminMapChart = ({ allRestaurants = [] }) => {
    const [theme] = useMode();
    const colors = tokens(theme.palette.mode);
    const mapRef = useRef(null);

    useEffect(() => {
        const states = [...new Set(allRestaurants.map(restaurant => restaurant.state))];
        const svg = mapRef.current?.querySelector('svg');

        if (svg) {
            svg.querySelectorAll('path').forEach((path) => {
                const stateName = path.getAttribute('data-name');
                if (states.includes(stateName)) {
                    path.style.fill = colors.greenAccent[400];
                    path.style.stroke = "#000";
                } else {
                    path.style.fill = "#b7ebde";
                    path.style.stroke = "#000";
                }
            });
        }
    }, [allRestaurants, colors]);

    const handleSelect = (state) => {
        if (allRestaurants.some(restaurant => restaurant.state === state)) {
            console.log("Selected state:", state);
        }
    };

    return (
        <Box ref={mapRef}>
            <India
                size={190}
                mapColor="#b7ebde"
                hoverColor="#4cceac"
                strokeColor="#000"
                strokeWidth={0.5}
                onSelect={handleSelect}
            />
        </Box>
    );
};

export default AdminMapChart;