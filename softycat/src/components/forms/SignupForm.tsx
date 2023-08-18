import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormStyled, FormContainer, InputStyled } from "../forms";
import { registerUser } from "../../Service/axiosFns";
import { useUser } from "../userContext";

type Inputs = {
  name: string,
  email: string,
  password: string,
};

export function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const { logIn } = useUser();
  const onSubmit: SubmitHandler<Inputs> = async formData => {
    const { regResponse } = await registerUser(formData);
    const { name } = regResponse.data;
    logIn(name);
  };

  console.log(watch("name")) // watch input value by passing the name of it

  return (/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <FormContainer>
      <SignupFormStyled onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputStyled placeholder="Name" {...register("name")} />

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