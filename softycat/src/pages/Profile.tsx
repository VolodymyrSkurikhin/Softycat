import { useNavigate } from "react-router-dom"
import { updateIsShown } from "../Service/axiosFns"
import { StyledBtn, StyledContainer, StyledItem, StyledItemValue, StyledLine, StyledShowYourselfBtn, Image } from "../components/profile";
// import { StyledBtn } from "../components/profile/StyledBtn"
// import { StyledContainer } from "../components/profile/StyledContainer"
// import { StyledItem } from "../components/profile/StyledItem"
// import { StyledItemValue } from "../components/profile/StyledItemValue"
// import { StyledLine } from "../components/profile/StyledLine"
// import { StyledShowYourselfBtn } from "../components/profile/StyledShowYourselfBtn"
import { useUser } from "../components/userContext"
import { loadUser, saveUser } from "../Service/LocalStorageFns"



export const Profile: React.FC = () => {
  const { name, email, avatarURL, isShown, showHide, logOut } = useUser();
  console.log(isShown);
  console.log(name);
  console.log(avatarURL);
  const navigate = useNavigate();
  const changeBtn = async () => {
    const result = await updateIsShown();
    if (result.success) {
      console.log(result.newIsShown);
      const userInfo = loadUser("user");
      if (userInfo) { saveUser("user", { ...userInfo, isShown: result.newIsShown }) };
      showHide(result.newIsShown);
      navigate("/home");
    }
    if (!result.success) {
      if (result.errorStatus === 401) {
        alert(`You are not logged in`);
        logOut();
        localStorage.removeItem("user");
        navigate("/home");
        return;
      }
      console.log(result.errorReason);
      alert(`Something went wrong.Try again`);
      navigate("/home");
      return;
    }
    // navigate("/home", { replace: true });
  };
  return (<StyledContainer>
    <StyledLine>
      <StyledItem>Name</StyledItem>
      <StyledItemValue>{name}</StyledItemValue>
      <StyledBtn type="button">Change</StyledBtn>
    </StyledLine>
    <StyledLine>
      <StyledItem>Email</StyledItem>
      <StyledItemValue>{email}</StyledItemValue>
      <StyledBtn type="button">Change</StyledBtn>
    </StyledLine>
    <StyledLine>
      {/* <StyledItem>Avatar</StyledItem> */}
      <Image src={avatarURL} alt="avatar image" />
      <StyledBtn type="button">Change avatar</StyledBtn>
    </StyledLine>
    <StyledLine>
      {isShown ? <StyledShowYourselfBtn onClick={changeBtn}>Hide your cats</StyledShowYourselfBtn> :
        <StyledShowYourselfBtn onClick={changeBtn}>Show your cats</StyledShowYourselfBtn>}
    </StyledLine>
  </StyledContainer>)
}