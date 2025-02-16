import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupUser } from '../../../api/auth';
import { Container, Box } from '@mui/material';
import SignupForm from '../components/SignupForm';

const SignupContainer = () => {
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
            await signupUser(data);
            reset();
            navigate("/login");
            toast.success("Registration Successful!");
        } catch (error) {
            console.error(error);
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
                <SignupForm
                    onSubmit={handleSubmit(registerHandler)}
                    loader={loader}
                    errors={errors}
                    register={register}
                />
            </Box>
        </Container>
    );
};

export default SignupContainer;
