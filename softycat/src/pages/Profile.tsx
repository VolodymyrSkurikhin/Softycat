import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { updateIsShown, getCurrentUser } from "../Service/axiosFns"
import { StyledBtn, StyledContainer, StyledItem, StyledItemValue, StyledLine, StyledShowYourselfBtn, StyledImgContainer, Image } from "../components/profile";
// import { StyledBtn } from "../components/profile/StyledBtn"
// import { StyledContainer } from "../components/profile/StyledContainer"
// import { StyledItem } from "../components/profile/StyledItem"
// import { StyledItemValue } from "../components/profile/StyledItemValue"
// import { StyledLine } from "../components/profile/StyledLine"
// import { StyledShowYourselfBtn } from "../components/profile/StyledShowYourselfBtn"
import { useUser } from "../components/userContext"
import { loadUser, saveUser } from "../Service/LocalStorageFns"
import { Container } from "../App.styled";
import { Modal } from "../components/Modal/Modal";
import { UpdateAvatarForm } from "../components/forms/UpdateAvatarForm";
import { UpdateNameOrEmailForm } from "../components/forms/UpdateNameOrEmailForm";



export const Profile: React.FC = () => {
  const { name, email, avatarURL, isShown, showHide, logOut, setContext } = useUser();
  // const [currentAvatar, setCurrentAvatar] = useState(avatarURL);
  // const [currentName, setCurrentName] = useState(name);
  // const [currentEmail, setCurrentEmail] = useState(email);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  console.log(isShown);
  console.log(name);
  console.log(avatarURL);
  const navigate = useNavigate();
  // const [updating, setUpdating] = useState(0);
  // console.log(updating);
  // const update = (newAvatar: string) => {
  //   // setUpdating(prev => { return (prev + 1) });
  //   setCurrentAvatar(newAvatar);
  // };
  const closeOpenAvatarModal = () => { setShowAvatarModal(prev => !prev) };
  const closeOpenNameModal = () => { setShowNameModal(prev => !prev) };
  const closeOpenEmailModal = () => { setShowEmailModal(prev => !prev) };
  const change = async (openFunc: any) => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.email === email) { openFunc() }
      else {
        alert("Login again, please!");
        logOut();
        return
      }
    }
    if (!result.success) {
      if (result.errorStatus === 401) {
        alert("Please,login again!");
        logOut();
        navigate('/home');
        return
      }
      alert("Something went wrong, try later, please!");
      navigate('/home');
    }
  }
  const changeIsShownBtn = async () => {
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
  return (<Container>
    <StyledContainer>
      <StyledLine>
        <StyledItem>Name</StyledItem>
        <StyledItemValue>{name}</StyledItemValue>
        <StyledBtn type="button" onClick={() => { change(closeOpenNameModal) }}>Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        <StyledItem>Email</StyledItem>
        <StyledItemValue>{email}</StyledItemValue>
        <StyledBtn type="button" onClick={() => { change(closeOpenEmailModal) }}>Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        {/* <StyledItem>Avatar</StyledItem> */}
        <StyledImgContainer>
          <Image src={avatarURL} alt="avatar image" width="100%" />
        </StyledImgContainer>
        <StyledBtn type="button" onClick={() => { change(closeOpenAvatarModal) }}>Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        {isShown ? <StyledShowYourselfBtn onClick={changeIsShownBtn}>Hide your cats</StyledShowYourselfBtn> :
          <StyledShowYourselfBtn onClick={changeIsShownBtn}>Show your cats</StyledShowYourselfBtn>}
      </StyledLine>
    </StyledContainer>
    {showNameModal && <Modal onClose={closeOpenNameModal}>
      <UpdateNameOrEmailForm updateNameOrEmailFunc={setContext} closeForm={closeOpenNameModal} point="name" />
    </Modal>}
    {showEmailModal && <Modal onClose={closeOpenEmailModal}>
      <UpdateNameOrEmailForm updateNameOrEmailFunc={setContext} closeForm={closeOpenEmailModal} point="email" />
    </Modal>}
    {showAvatarModal && <Modal onClose={closeOpenAvatarModal}>
      <UpdateAvatarForm updateImages={setContext} closeForm={closeOpenAvatarModal} />
    </Modal>}
  </Container>)
}