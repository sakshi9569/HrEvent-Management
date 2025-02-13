import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; 
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';

const LoginForm = ({ onSubmit, loader, errors, register }) => {
    return (
        <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
                width: "100%",
                maxWidth: "400px", 
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "#E2E0C8", 
                margin: "0.8", 
                mt: 8, 
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: "bold", color: "#5C7285", mb: 3 }} 
            >
                Login Here
            </Typography>

            <Box sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ mb: 2, bgcolor: "#A7B49E", borderRadius: 1 }} 
                    InputProps={{ style: { color: "#5C7285" } }} 
                    InputLabelProps={{ style: { color: "#5C7285" } }} 
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2, bgcolor: "#A7B49E", borderRadius: 1 }} 
                    InputProps={{ style: { color: "#5C7285" } }} 
                    InputLabelProps={{ style: { color: "#5C7285" } }} 
                />
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loader}
                sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    bgcolor: "#5C7285", 
                    color: "#E2E0C8", 
                    "&:hover": { bgcolor: "#818C78" }, 
                    borderRadius: 1,
                }}
            >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3, color: "#5C7285" }}>
                Don't have an account?{" "}
                <Link 
                    to="/signup" 
                    style={{ 
                        textDecoration: "none", 
                        color: "#5C7285", 
                        fontWeight: "bold",
                        "&:hover": { color: "#818C78" } 
                    }}
                >
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;