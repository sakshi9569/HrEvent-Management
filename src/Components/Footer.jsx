import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", textAlign: "center", py: 2 }}>
      <Typography variant="body2">© 2025 Event Management System</Typography>
    </Box>
  );
};

export default Footer;
