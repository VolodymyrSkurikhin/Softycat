import { useForm, SubmitHandler } from "react-hook-form";
import { SignupFormStyled, FormContainer, InputStyled } from "../forms";
import { useUser } from "../userContext";
import { useNavigate } from "react-router-dom";
import { saveUser, loadUser } from "../../Service/LocalStorageFns";
import { updateNameOrEmail } from "../../Service/axiosFns";

type Inputs = {
  instance: string,
};

// type Inputs=string;

export function UpdateNameOrEmailForm({ updateNameFunc, closeForm, point }: { updateNameFunc: any, closeForm: any, point: string }) {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();
  const { logOut } = useUser();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async formData => {

    const res = await updateNameOrEmail(formData, point);
    if (res.success) {
      // const { _id, name, birthday, breed, forSale, catImageURL } = res.cat;
      reset();
      const userInfo = loadUser("user");
      if (userInfo) { saveUser("user", { ...userInfo, name: res.instance }) };
      closeForm();
      updateNameFunc(res.instance);
      return
    } else {
      // alert(`${res.errorReason}`);
      reset();
      if (res.errorStatus === 401) {
        alert("Please, login again");
        logOut();
        // localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }

  console.log(watch("instance")) // watch input value by passing the name of it

  return (/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <FormContainer>
      <SignupFormStyled onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <InputStyled placeholder={point} {...register("instance")} />
        {errors.instance && <span>This field is required</span>}
        <InputStyled type="submit" />
      </SignupFormStyled>
    </FormContainer>
  );
}