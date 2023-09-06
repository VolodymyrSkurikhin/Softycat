import { useNavigate } from "react-router-dom"
import { updateIsShown } from "../Service/axiosFns"
import { StyledBtn } from "../components/profile/StyledBtn"
import { StyledContainer } from "../components/profile/StyledContainer"
import { StyledItem } from "../components/profile/StyledItem"
import { StyledItemValue } from "../components/profile/StyledItemValue"
import { StyledLine } from "../components/profile/StyledLine"
import { StyledShowYourselfBtn } from "../components/profile/StyledShowYourselfBtn"
import { useUser } from "../components/userContext"



export const Profile: React.FC = () => {
  const { name, email, avatarURL, isShown, showHide } = useUser();
  console.log(isShown);
  console.log(name);
  console.log(avatarURL);
  const navigate = useNavigate();
  const changeBtn = async () => {
    const newIsShown = await updateIsShown();
    showHide(newIsShown);
    navigate("/home", { replace: true });
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
      <StyledItem>Avatar</StyledItem>
      <StyledItemValue>{avatarURL}</StyledItemValue>
      <StyledBtn type="button">Change</StyledBtn>
    </StyledLine>
    <StyledLine>
      {isShown ? <StyledShowYourselfBtn onClick={changeBtn}>Hide your cats</StyledShowYourselfBtn> :
        <StyledShowYourselfBtn onClick={changeBtn}>Show your cats</StyledShowYourselfBtn>}
    </StyledLine>
  </StyledContainer>)
}