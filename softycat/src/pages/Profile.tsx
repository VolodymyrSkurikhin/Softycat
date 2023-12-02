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



export const Profile: React.FC = () => {
  const { name, email, avatarURL, isShown, showHide, logOut } = useUser();
  const [currentAvatar, setCurrentAvatar] = useState(avatarURL);
  const [showModal, setShowModal] = useState(false);
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
  const closeOpenModal = () => { setShowModal(prev => !prev) };
  const changeAvatar = async () => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.name === name) { closeOpenModal() }
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
        <StyledBtn type="button">Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        <StyledItem>Email</StyledItem>
        <StyledItemValue>{email}</StyledItemValue>
        <StyledBtn type="button">Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        {/* <StyledItem>Avatar</StyledItem> */}
        <StyledImgContainer>
          <Image src={currentAvatar} alt="avatar image" width="100%" />
        </StyledImgContainer>
        <StyledBtn type="button" onClick={changeAvatar}>Change</StyledBtn>
      </StyledLine>
      <StyledLine>
        {isShown ? <StyledShowYourselfBtn onClick={changeIsShownBtn}>Hide your cats</StyledShowYourselfBtn> :
          <StyledShowYourselfBtn onClick={changeIsShownBtn}>Show your cats</StyledShowYourselfBtn>}
      </StyledLine>
    </StyledContainer>
    {showModal && <Modal onClose={closeOpenModal}>
      <UpdateAvatarForm updateImages={setCurrentAvatar} closeForm={closeOpenModal} />
    </Modal>}
  </Container>)
}