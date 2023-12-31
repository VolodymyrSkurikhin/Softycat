import { io } from "socket.io-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useUser } from "../userContext";
import { ChatStyled, ChatMessages, ChatForm } from "../Chat";
import { StyledBtn } from "../profile/StyledBtn";
import { getCurrentUser } from "../../Service/axiosFns";
import { IItem } from "./ChatMessages";

const socket = io("http://localhost:4000");


export const Chat: React.FC = () => {
  const { name, token, logOut, email } = useUser();
  const navigate = useNavigate();
  const [isChatOn, setIsChatOn] = useState(false);
  const [content, setContent] = useState<IItem[]>([]);
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
  const showHideChat = () => { setIsChatOn(prev => !prev) };
  const btnText = isChatOn ? "Close chat" : "Open chat";
  const addMessage = (message: string) => {
    setContent(prevContent => {
      const newContent: IItem = { author: name, id: nanoid(), message, type: "my", time: new Date().toLocaleString() };
      return [...prevContent, newContent]
    });
    socket.emit("chat-message", message);
  }
  return (<ChatStyled>
    {(!name || !token) && <p>Register or login to start chat</p>}
    {(name && token) && <StyledBtn type="button" onClick={() => { change(showHideChat) }}>
      {`${btnText}`}</StyledBtn>}
    {name && token && isChatOn && <><ChatMessages items={content} />
      <ChatForm onSubmit={addMessage} /></>}
  </ChatStyled>)
}