import React from "react";
import { Typography } from "@mui/material";

interface OmHeaderProps {
  header: string;
}

const OmHeader: React.FC<OmHeaderProps> = ({ header }: OmHeaderProps) => {
  return (
    <Typography
      component="div"
      variant="h5"
      display="block"
      gutterBottom
      align="center"
    >
      {header}
    </Typography>
  );
};

export default OmHeader;
