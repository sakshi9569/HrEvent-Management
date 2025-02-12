import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress
} from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { setToken, setUserId } = useStoreContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post("/user/login", data);
            setToken(response.token);
            setUserId(response.id);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            localStorage.setItem("id", response.id);
            toast.success("Login Successful!");
            reset();
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Login Failed!");
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
                <Box
                    component="form"
                    onSubmit={handleSubmit(loginHandler)}
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
                        sx={{ fontWeight: "bold", color: "primary.main" }}
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
                        <Link to="/" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
