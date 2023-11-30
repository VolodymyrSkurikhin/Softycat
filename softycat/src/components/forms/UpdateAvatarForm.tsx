import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormStyled, InputStyled } from ".";
import { updateAvatar } from "../../Service/axiosFns";
import { useUser } from "../userContext";
import { loadUser, saveUser } from "../../Service/LocalStorageFns";

type Inputs = {
  photo: File
};


export const UpdateAvatarForm = ({ updateImages, closeForm }: { updateImages: any, closeForm: any }) => {
  console.log("addImageForm", updateImages);
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
    const res = await updateAvatar(formData);
    if (res.success) {
      // const { _id, name, birthday, breed, forSale, catImageURL } = res.cat;
      reset();
      const userInfo = loadUser("user");
      if (userInfo) { saveUser("user", { ...userInfo, avatarURL: res.avatarURL }) };
      closeForm();
      updateImages(res.avatarURL);
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
    <SignupFormStyled id="updateAvatarForm" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <input id="file" type="file" placeholder="Choose image"{...register("photo", { required: true })} />
      {errors.photo && <span>This field is required</span>}
      <InputStyled type="submit" />
    </SignupFormStyled>
  );
}