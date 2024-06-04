import React from "react";
import { Box, CircularProgress } from "@mui/material";

const OmLoading: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
};

export default OmLoading;
