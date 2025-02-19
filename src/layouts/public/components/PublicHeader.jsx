import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useStoreContext } from "../../../contextApi/ContextApi"; 
import { useLocation, Link } from "react-router-dom";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#5C7285",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const CustomButton = styled(Button)(({ active }) => ({
  color: "#E2E0C8",
  margin: "5 10px",
  backgroundColor: active ? "#818C78" : "transparent",
  "&:hover": {
    backgroundColor: "#818C78",
  },
}));

const ButtonBox = styled(Box)({
  padding: "8px 16px",
  margin: "0 6px",
  borderRadius: "12px",
  display: "inline-flex",
  alignItems: "center",
});

const PublicHeader = () => {
  const { token, logout } = useStoreContext(); 
  const location = useLocation();

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
              <CustomButton component={Link} to="/" active={location.pathname === "/" ? 1 : 0}>
                Login
              </CustomButton>
            </ButtonBox>
            <ButtonBox>
              <CustomButton component={Link} to="/signup" active={location.pathname === "/signup" ? 1 : 0}>
                Signup
              </CustomButton>
            </ButtonBox>
          </>
        )}
      </Toolbar>
    </CustomAppBar>
  );
};

export default PublicHeader;
