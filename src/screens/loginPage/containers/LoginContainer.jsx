import React, { Component } from "react";
import { withRouter } from "../../../utils/withRouter.jsx"; 
import toast from "react-hot-toast";
import { ContextApi } from "../../../contextApi/ContextApi.jsx"; 
import { loginUser } from "../../../api/auth";

import { Container, Box } from "@mui/material";
import { useForm } from "react-hook-form"; 
import LoginForm from "../components/LoginForm";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  loginHandler = async (data) => {
    this.setState({ loader: true });

    try {
      const response = await loginUser(data);

      this.context.setToken(response.token);
      this.context.setUserId(response.id);

      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      localStorage.setItem("id", response.id);
      localStorage.setItem("role", response.role);

      toast.success("Login Successful!");

      if (response.role === "ADMIN") {
        this.props.navigate("/admindashboard");
      } else if (response.role === "USER") {
        this.props.navigate("/dashboard");
      } else {
        this.props.navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login Failed!");
    } finally {
      this.setState({ loader: false });
    }
  };

  render() {
    return (
      <ContextApi.Consumer>
        {(context) => {
          this.context = context; // Assigning context to class component

          return <LoginFormWrapper onSubmit={this.loginHandler} loader={this.state.loader} />;
        }}
      </ContextApi.Consumer>
    );
  }
}

// Assign Context API to class
LoginContainer.contextType = ContextApi;

// Export component wrapped with `withRouter` for navigation support
export default withRouter(LoginContainer);

// Wrap the functional component to use useForm
const LoginFormWrapper = ({ onSubmit, loader }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return <LoginForm onSubmit={handleSubmit(onSubmit)} loader={loader} register={register} errors={errors} />;
};
