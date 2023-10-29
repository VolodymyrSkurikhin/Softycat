import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupFormStyled, InputStyled } from "../forms";
import { addCat } from "../../Service/axiosFns";
import { useUser } from "../userContext";
// import { useParams } from "react-router-dom";

type Inputs = {
  name: string,
  birthday: string,
  breed: string,
  forSale: boolean,
  photo: File
};


export const AddCatForm = ({ updateFamily }: any) => {
  const navigate = useNavigate();
  const { logOut } = useUser();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<Inputs>();
  // const { ownerId } = useParams();
  // const form = document.getElementById("addCatForm") as HTMLFormElement;

  // console.log(file);

  console.log(watch("name")) // watch input value by passing the name of it

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    const file = fileInput?.files?.item(0) as File;
    formData.photo = file;
    console.log(formData);
    // formData.append()

    // if (ownerId) {
    const res = await addCat(formData);
    if (res.success) {
      // const { _id, name, birthday, breed, forSale, catImageURL } = res.cat;
      updateFamily();
      reset();
      return
    } else {
      // alert(`${res.errorReason}`);
      reset();
      if (res.errorStatus === 401) {
        alert("Please, login again");
        logOut();
        localStorage.removeItem("user");
        navigate("/login");
      }
      // }
    }
  };

  return (/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <SignupFormStyled id="addCatForm" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
      <input id="file" type="file" placeholder="Choose image"{...register("photo", { required: true })} />
      {/* register your input into the hook by invoking the "register" function */}
      <InputStyled placeholder="Name" {...register("name")} />
      {errors.name && <span>This field is required</span>}
      {/* include validation with required or other standard HTML validation rules */}
      <InputStyled placeholder="Birthday"{...register("birthday", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.birthday && <span>This field is required</span>}
      <InputStyled placeholder="Breed"{...register("breed", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.breed && <span>This field is required</span>}
      <InputStyled placeholder="For sale:true or false"{...register("forSale", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.forSale && <span>This field is required</span>}
      <InputStyled type="submit" />
    </SignupFormStyled>
  );
}