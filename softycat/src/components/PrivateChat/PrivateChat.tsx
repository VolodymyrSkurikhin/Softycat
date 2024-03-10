import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import { useUser } from "../userContext";
import { ChatMessages, ChatForm } from "../Chat";
import { PrivateChatStyled } from "./PrivateChat.styled";
import { StyledBtn } from "../profile/StyledBtn";
import { getCurrentUser } from "../../Service/axiosFns";
import { IItem } from "../Chat/ChatMessages";
// import { socket } from "../Chat/Chat";
import { PrivateChatInvitForm } from "./InvitForm";
import { useSocket } from "../socketContext";


export const PrivateChat: React.FC = () => {
  const { name, token, logOut, email } = useUser();
  const navigate = useNavigate();
  const [isChatOn, setIsChatOn] = useState(false);
  const [isInviteOn, setIsInviteOn] = useState(false);
  const { socket } = useSocket();
  // const [invitation, setInvitation] = useState<IInvite>({ room: "", peer: "" });
  const [content, setContent] = useState<IItem[]>([]);
  const [roomId, setRoomId] = useState("");
  const showHideChat = () => { setIsChatOn(prev => !prev) };
  const showHideInvite = () => { setIsInviteOn(prev => !prev) };
  useEffect(() => {
    console.log("subscribing");
    socket && socket.on("private-message", (incomingContent) => {
      setIsChatOn(true);
      // if (isChatOn === false) { showHideChat() };
      console.log("incoming content", incomingContent);
      const newContent: IItem = {
        author: incomingContent.author, id: incomingContent.id,
        message: incomingContent.message, type: "yours", time: new Date().toLocaleString()
      };
      // const newRoomContent: IRoom = { author: incomingContent.author, room: incomingContent.newRoom };
      setContent(prevContent => {
        return [...prevContent, newContent];
      });
    })
  }, [socket]);
  useEffect(() => {
    socket && socket.on("sendRoomId", (newRoom) => {
      setRoomId(newRoom);
      console.log(`newRoom is...${newRoom}`)
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

  const btnText = isChatOn || isInviteOn ? "Close private chat" : "Open private chat";

  const invite = async (peer: string, message: string) => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.email === email) {
        // const newInvitation: IInvite = { peer };
        // setInvitation(newInvitation);
        const sender = name;
        if (!socket) { alert("Connection to private chat is not established. Try later,please"); return }
        socket.emit("joinPrivate", peer, message, sender, token);
        socket.on("joinPrivate", (reply) => (alert(reply)));
        showHideInvite();
        showHideChat()
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

  const addMessage = async (message: string) => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.email === email) {
        const newContent: IItem = { author: name, id: nanoid(), message, type: "my", time: new Date().toLocaleString() };
        setContent(prevContent => {
          return [...prevContent, newContent]
        });
        socket && socket.emit("private-message", { author: name, id: nanoid(), message });
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
  const leavePrivateChat = () => { socket?.emit("leavePrivateChat", name, roomId) };
  return (<PrivateChatStyled>
    {(name && token) && <StyledBtn type="button" onClick={() => { change(showHideInvite) }}>
      {`${btnText}`}</StyledBtn>}
    {name && token && isChatOn && <ChatMessages items={content} onLeave={leavePrivateChat} />}
    {name && token && isChatOn && <ChatForm onSubmit={addMessage} />}
    {name && token && isInviteOn && <PrivateChatInvitForm onSubmit={invite} />}
  </PrivateChatStyled>)
}