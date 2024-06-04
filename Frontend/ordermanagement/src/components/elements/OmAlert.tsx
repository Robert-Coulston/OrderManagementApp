import React from "react";
import { Alert, Box } from "@mui/material";

interface OmAlertProps {
        message: string;    
}

const OmAlert: React.FC<OmAlertProps> = ({message}: OmAlertProps) => {
    return (
        <Box sx={{ display: "flex" }}>
                <Alert severity="error">{message}</Alert>
        </Box>
    );
};

export default OmAlert;
