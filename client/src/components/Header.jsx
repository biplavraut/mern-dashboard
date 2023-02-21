import { Typography, Box, useTheme, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, subtitle, addNew }) => {
    const theme = useTheme();

    const navigate = useNavigate();



    return (
        <Box>
            <FlexBetween>
                <Box>
                    <Typography
                        variant="h2"
                        color={theme.palette.secondary[100]}
                        fontWeight="bold"
                        sx={{ mb: "5px" }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="h5" color={theme.palette.secondary[300]}>
                        {subtitle}
                    </Typography>

                </Box>
                {addNew != null &&
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate(`/${addNew}/create`);
                        }}
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransformation: "none", gap: "1rem" }}>
                        Add New
                    </Button>
                }


            </FlexBetween>
        </Box>
    );
};

export default Header;
