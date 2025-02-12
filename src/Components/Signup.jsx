import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Paper,
    Stack
} from '@mui/material';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            empId: "",
            team: ""
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post("/user/signup", data);
            reset();
            navigate("/login");
            toast.success("Registration Successful!");
        } catch (error) {
            console.log(error);
            toast.error("Registration Failed!");
        } finally {
            setLoader(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100vh",
                    justifyContent: "center"
                }}
            >
                <Paper
                    component="form"
                    onSubmit={handleSubmit(registerHandler)}
                    elevation={5}
                    sx={{
                        width: "100%",
                        padding: 4,
                        borderRadius: 3,
                        bgcolor: "background.paper"
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ fontWeight: "bold", color: "primary.main" }}
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
                        />

                        <TextField
                            fullWidth
                            label="Last Name"
                            type="text"
                            {...register("lastname", { required: "Last Name is required" })}
                            error={!!errors.lastname}
                            helperText={errors.lastname?.message}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            {...register("password", { required: "Password is required", minLength: 6 })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <TextField
                            fullWidth
                            label="Emp ID"
                            type="text"
                            {...register("empId", { required: "Emp ID is required" })}
                            error={!!errors.empId}
                            helperText={errors.empId?.message}
                        />

                        <TextField
                            fullWidth
                            label="Team"
                            type="text"
                            {...register("team", { required: "Team is required" })}
                            error={!!errors.team}
                            helperText={errors.team?.message}
                        />
                    </Stack>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loader}
                        sx={{
                            mt: 3,
                            py: 1.5,
                            fontWeight: "bold",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                            Login
                        </Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterPage;
