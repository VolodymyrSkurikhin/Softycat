import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import { useUser } from "../userContext";
import { ChatStyled, ChatMessages, ChatForm } from "../Chat";
import { StyledBtn } from "../profile/StyledBtn";
import { getCurrentUser } from "../../Service/axiosFns";
import { IItem } from "../Chat/ChatMessages";
import { socket } from "../Chat/Chat";
import { PrivateChatInvitForm } from "./InvitForm";

// interface IInvite {
//   peer: string
// }



export const PrivateChat: React.FC = () => {
  const { name, token, logOut, email } = useUser();
  const navigate = useNavigate();
  const [isChatOn, setIsChatOn] = useState(false);
  const [isInviteOn, setIsInviteOn] = useState(true);
  // const [invitation, setInvitation] = useState<IInvite>({ room: "", peer: "" });
  const [content, setContent] = useState<IItem[]>([]);
  useEffect(() => {
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
  }, []);
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
  const showHideInvite = () => { setIsInviteOn(prev => !prev) };
  const btnText = isChatOn ? "Close private chat" : "Open private chat";

  const invite = async (peer: string) => {
    const result = await getCurrentUser();
    if (result.success) {
      if (result.user.email === email) {
        // const newInvitation: IInvite = { peer };
        // setInvitation(newInvitation);
        socket.emit("joinPrivate", peer);
        showHideInvite();
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
  return (<ChatStyled>
    {(name && token) && <StyledBtn type="button" onClick={() => { change(showHideChat) }}>
      {`${btnText}`}</StyledBtn>}
    {name && token && isChatOn && !isInviteOn && <ChatMessages items={content} />}
    {name && token && isChatOn && !isInviteOn && <ChatForm onSubmit={addMessage} />}
    {name && token && isInviteOn && <PrivateChatInvitForm onSubmit={invite} />}
  </ChatStyled>)
}