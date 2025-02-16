import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useStoreContext } from "../../../contextApi/ContextApi"; 

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#5C7285",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const CustomButton = styled(Button)({
  color: "#E2E0C8",
  margin: "0 10px",
  "&:hover": {
    backgroundColor: "#818C78",
  },
});

const ButtonBox = styled(Box)({
  backgroundColor: "#A7B49E",
  padding: "8px 16px",
  margin: "0 6px",
  borderRadius: "4px",
  display: "inline-flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#818C78",
  },
});

const PublicHeader = () => {
  const { token, logout } = useStoreContext(); 
  return (
    <CustomAppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#E2E0C8" }}>
          PeopleSync
        </Typography>
        {token ? (
          <ButtonBox>
            <CustomButton onClick={logout}>Logout</CustomButton>
          </ButtonBox>
        ) : (
          <>
            <ButtonBox>
              <CustomButton href="/">Login</CustomButton>
            </ButtonBox>
            <ButtonBox>
              <CustomButton href="/signup">Signup</CustomButton>
            </ButtonBox>
          </>
        )}
      </Toolbar>
    </CustomAppBar>
  );
};

export default PublicHeader;