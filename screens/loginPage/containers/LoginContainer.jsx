import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../../../contextApi/ContextApi';

import { Container, Box } from '@mui/material';
import LoginForm from '../components/index';

const LoginContainer = () => {
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
            localStorage.setItem("role",response.role);
            
            toast.success("Login Successful!");
            reset();
            navigate("/admindashboard");
            if(response.role === "ADMIN"){
                navigate("/admindashboard");
            }
            else if(response.role === "USER"){
                navigate("/dashboard");
            }
            else{
                navigate("/");
            }
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
                <LoginForm
                    onSubmit={handleSubmit(loginHandler)}
                    loader={loader}
                    errors={errors}
                    register={register}
                />
            </Box>
        </Container>
    );
};

export default LoginContainer;