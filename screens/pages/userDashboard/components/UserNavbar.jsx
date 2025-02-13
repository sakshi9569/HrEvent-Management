import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserNavbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed"
      sx={{ 
        backgroundColor: "#5C7285",
        boxShadow: 4,
        zIndex: 1000,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "bold", 
            color: "#E2E0C8",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          PeopleSync
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#A7B49E",
            color: "#5C7285",
            "&:hover": { backgroundColor: "#818C78", color: "#E2E0C8" },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default UserNavbar;