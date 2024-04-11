// import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useUser } from "../userContext";
import { ChatStyled, ChatMessages, ChatForm } from "../Chat";
import { StyledBtn } from "../profile/StyledBtn";
import { getCurrentUser } from "../../Service/axiosFns";
import { IItem } from "./ChatMessages";
import { useSocket } from "../socketContext";
import { getAllCommonMessages } from "../../Service/axiosFns";


// export const socket = io("http://localhost:4000");



export const Chat: React.FC = () => {
  const { socket } = useSocket();
  const { name, token, logOut, email } = useUser();
  const navigate = useNavigate();
  const [isChatOn, setIsChatOn] = useState(false);
  const [content, setContent] = useState<IItem[]>([]);
  useEffect(() => {
    (async () => {
      const result = await getAllCommonMessages();
      if (result.success) {
        const allMsgs = result.commonMessages.map((item) => {
          const type = item.author === name ? "my" : "yours";
          item.type = type;
          return { ...item }
        });
        setContent(allMsgs);
      }
      else { alert("Sorry, cant show previous messages right now") }
    })()
  }, [name]
  );
  useEffect(() => {
    if (!socket) return;
    console.log("subscribing");
    socket.on("chat-message", (incomingContent: IItem) => {
      console.log("incoming content", incomingContent);

      const newContent: IItem = {
        author: incomingContent.author, id: incomingContent.id,
        message: incomingContent.message, type: "yours", time: incomingContent.time
      };
      setContent(prevContent => {
        return [...prevContent, newContent]
      });
    })
  }, [socket]);
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
  const btnText = isChatOn ? "Close common chat" : "Open common chat";
  const addMessage = async (message: string) => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.email === email && socket) {
        const newContent: IItem = { author: name, id: nanoid(), message, type: "my", time: new Date().toLocaleString() };
        setContent(prevContent => {
          // newContent= { author: name, id: nanoid(), message, type: "my", time: new Date().toLocaleString() };
          return [...prevContent, newContent]
        });
        socket.emit("chat-message", newContent);
      }
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
  const leaveCommonChat = () => { };
  return (<ChatStyled>
    {(!name || !token) && <p>Register or login to start chat</p>}
    {(name && token) && <StyledBtn type="button" onClick={() => { change(showHideChat) }}>
      {`${btnText}`}</StyledBtn>}
    {name && token && isChatOn && <><ChatMessages items={content} onLeave={leaveCommonChat} />
      <ChatForm onSubmit={addMessage} /></>}
  </ChatStyled>)
}