import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormStyled, FormContainer, InputStyled } from ".";
import { loginUser } from "../../Service/axiosFns";
import { useUser } from "../userContext";
import { Navigate, useNavigate } from "react-router-dom";

type Inputs = {
  email: string,
  password: string,
};

export function LoginForm() {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();
  const navigate = useNavigate();
  const { logIn, isLoggedIn } = useUser();
  if (isLoggedIn) {
    alert("You are loggedin already!");
    // navigate("/home");
    return <Navigate to="/home" replace={true} />;
  } else {
    const onSubmit: SubmitHandler<Inputs> = async formData => {
      const res = await loginUser(formData);
      if (res.success) {
        const { name, email, avatarURL, isShown } = res;
        logIn(name, email, avatarURL, isShown);
        navigate("/home", { replace: true });
      } else {
        alert(`${res.errorReason}`);
        reset();
      }
    };

    console.log(watch("email")) // watch input value by passing the name of it

    return (/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <FormContainer>
        <SignupFormStyled onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          {/* include validation with required or other standard HTML validation rules */}
          <InputStyled placeholder="Email"{...register("email", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.email && <span>This field is required</span>}
          <InputStyled placeholder="Password"{...register("password", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.password && <span>This field is required</span>}
          <InputStyled type="submit" />
        </SignupFormStyled>
      </FormContainer>
    );
  }
}