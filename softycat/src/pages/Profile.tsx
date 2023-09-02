import { updateIsShown } from "../Service/axiosFns"
import { StyledBtn } from "../components/profile/StyledBtn"
import { StyledContainer } from "../components/profile/StyledContainer"
import { StyledItem } from "../components/profile/StyledItem"
import { StyledItemValue } from "../components/profile/StyledItemValue"
import { StyledLine } from "../components/profile/StyledLine"
import { StyledShowYourselfBtn } from "../components/profile/StyledShowYourselfBtn"
import { useUser } from "../components/userContext"



export const Profile: React.FC = () => {
  const { username, email, avatarURL, isShown, showHide } = useUser();
  const changeBtn = async () => {
    const isShown = await updateIsShown();
    showHide(isShown);
  };
  return (<StyledContainer>
    <StyledLine>
      <StyledItem>Name</StyledItem>
      <StyledItemValue>{username}</StyledItemValue>
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
      {isShown ? <StyledShowYourselfBtn onSubmit={changeBtn}>Show your cats</StyledShowYourselfBtn> :
        <StyledShowYourselfBtn onSubmit={changeBtn}>Hide your cats</StyledShowYourselfBtn>}

    </StyledLine>
  </StyledContainer>)
}