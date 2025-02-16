import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Paper,
    Stack,
} from '@mui/material';
import { Link } from 'react-router-dom'; 


const SignupForm = ({ onSubmit, loader, errors, register }) => {
    return (
        <Paper
            component="form"
            onSubmit={onSubmit}
            elevation={5}
            sx={{
                width: "100%",
                padding: 4,
                borderRadius: 3,
                bgcolor: "#E2E0C8"
            }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: "bold", color: "#5C7285" }}
            >
                Register Here
            </Typography>

            <Stack spacing={2} sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    type="text"
                    {...register("firstname", { required: "First Name is required" })}
                    error={!!errors.firstname}
                    helperText={errors.firstname?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />

                <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    {...register("lastname", { required: "Last Name is required" })}
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    {...register("password", { required: "Password is required", minLength: 6 })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />

                <TextField
                    fullWidth
                    label="Emp ID"
                    type="text"
                    {...register("empId", { required: "Emp ID is required" })}
                    error={!!errors.empId}
                    helperText={errors.empId?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />

                <TextField
                    fullWidth
                    label="Team"
                    type="text"
                    {...register("team", { required: "Team is required" })}
                    error={!!errors.team}
                    helperText={errors.team?.message}
                    sx={{ bgcolor: "#A7B49E", borderRadius: 1 }}
                />
            </Stack>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loader}
                sx={{
                    mt: 3,
                    py: 1.5,
                    fontWeight: "bold",
                    bgcolor: "#5C7285",
                    color: "white",
                    '&:hover': { bgcolor: "#818C78" }
                }}
            >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>

            <Typography variant="body2" align="center" sx={{ mt: 3, color: "#5C7285" }}>
                Already have an account?{" "}
                <Link to="/" style={{ textDecoration: "none", color: "#5C7285", fontWeight: "bold" }}>
                    Login
                </Link>
            </Typography>
        </Paper>
    );
};

export default SignupForm;
