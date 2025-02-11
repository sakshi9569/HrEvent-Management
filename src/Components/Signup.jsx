import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';

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
            const { data: response } = await api.post(
                "/user/signup",
                data
            );
            reset();
            navigate("/login");
            toast.success("Registeration Successful!")
        } catch (error) {
            console.log(error);
            toast.error("Registeration Failed!")
        } finally {
            setLoader(false);
        }
    };

    return (
        <div
            className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                    Register Here
                </h1>

                <hr className='mt-2 mb-5 text-black' />

                <div className="flex flex-col gap-3">
                    <TextField
                        label="First Name"
                        required
                        id="firstname"
                        type="text"
                        message="*First Name is required"
                        placeholder="Type your First Name"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Last Name"
                        required
                        id="lastname"
                        type="text"
                        message="*Last Name is required"
                        placeholder="Type your last name"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email."
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Type your password"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="EmpId"
                        required
                        id="empId"
                        type="text"
                        message="*EmpId is required"
                        placeholder="Type your EmpId"
                        register={register}
                        errors={errors}
                    />

                    <TextField
                        label="Team"
                        required
                        id="team"
                        type="text"
                        message="*Team is required"
                        placeholder="Type your team"
                        register={register}
                        errors={errors}
                    />

                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? "Loading..." : "Register"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Already have an account?
                    <Link
                        className='font-semibold underline hover:text-black'
                        to="/login">
                        <span className='text-btnColor'> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage