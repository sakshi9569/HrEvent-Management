import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; // Import the Link component
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
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                bgcolor: "background.paper"
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: "bold", color: "cyan.main" }}
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
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ mb: 2 }}
                />
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loader}
                sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" }
                }}
            >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                    Sign Up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;