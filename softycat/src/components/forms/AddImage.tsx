import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormStyled, InputStyled } from "../forms";
import { addImage } from "../../Service/axiosFns";
import { useUser } from "../userContext";

type Inputs = {
  photo: File
};


export const AddImageForm = ({ updateImages }: any, catId: string) => {
  const navigate = useNavigate();
  const { logOut } = useUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput?.files?.item(0) as File;
    formData.photo = file;
    console.log(formData);
    // formData.append()

    // if (ownerId) {
    const res = await addImage(formData, catId);
    if (res.success) {
      // const { _id, name, birthday, breed, forSale, catImageURL } = res.cat;
      updateImages();
      reset();
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
      // }
    }
  };

  return (/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <SignupFormStyled id="addCatForm" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <input id="file" type="file" placeholder="Choose image"{...register("photo", { required: true })} />
      {errors.photo && <span>This field is required</span>}
      <InputStyled type="submit" />
    </SignupFormStyled>
  );
}