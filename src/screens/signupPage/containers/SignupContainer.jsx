import  { Component } from "react";
import { withRouter } from "../../../utils/withRouter.jsx";
import toast from "react-hot-toast";
import { signupUser } from "../../../api/auth";
import { Container, Box } from "@mui/material";
import SignupForm from "../components/SignupForm";
import { useForm } from "react-hook-form";

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  registerHandler = async (data) => {
    this.setState({ loader: true });

    try {
      await signupUser(data);
      toast.success("Registration Successful!");

      this.props.navigate("/"); 
    } catch (error) {
      console.error(error);
      toast.error("Registration Failed!");
    } finally {
      this.setState({ loader: false });
    }
  };

  render() {
    return (
      <Container maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <SignupFormWrapper onSubmit={this.registerHandler} loader={this.state.loader} />
        </Box>
      </Container>
    );
  }
}

export default withRouter(SignupContainer);

const SignupFormWrapper = ({ onSubmit, loader }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      empId: "",
      team: "",
    },
    mode: "onTouched",
  });

  return <SignupForm onSubmit={handleSubmit(onSubmit)} loader={loader} register={register} errors={errors} />;
};
