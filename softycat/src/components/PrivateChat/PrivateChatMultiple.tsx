import { useState, useEffect } from "react";
import { getAllPrivateMessages } from "../../Service/axiosFns";
import { PrivateChat } from "./PrivateChat";
import { StyledBtn } from "../profile/StyledBtn";

// interface IPrivateMessage {
//   starter: string,
//   corresp: string,
//   author: string,
//   id: string,
//   message: string,
//   type: "my" | "yours",
//   time: string
// }

interface IItem {
  author: string,
  id: string,
  message: string,
  type: "my" | "yours",
  time: string
}


export const PrivateChatMultiple: React.FC = () => {
  const [multyChats, setMultyChats] = useState<IItem[][]>([]);
  const [isChatOn, setIsChatOn] = useState(false);
  const showHideChat = () => { setIsChatOn(prev => !prev) };
  useEffect(() => {
    (async () => {
      const result = await getAllPrivateMessages();
      if (result.success) {
        const msgsByChat: { [key: string]: IItem[] } = {};
        const allMsgs = result.privateMessages;
        for (const msg of allMsgs) {
          const st = msg.starter;
          const cor = msg.corresp;
          const chatId = st + cor; // use pair of start + correspond as indetifier of chat
          if (!(chatId in msgsByChat)) {//msgsByChat instead of allMsgs???????
            msgsByChat[chatId] = [];  // initilize empty array if first time we see this chat
          }
          msgsByChat[chatId].push({  // add msg to array of msg of this chat
            author: msg.author,
            id: msg.id,
            message: msg.message,
            time: msg.time,
            type: msg.type,
          })
        }
        setMultyChats(Object.values(msgsByChat));

        //   const onePrivChat = allMsgs.filter((msg) => (msg.starter === st) && (msg.corresp === cor));
        //   const onePrivChatNormalized = onePrivChat.map(oneChat => {
        //     const type: "my" | "yours" = oneChat.author === name ? "my" : "yours";
        //     return {
        //       author: oneChat.author,
        //       id: oneChat.id,
        //       message: oneChat.message,
        //       time: oneChat.time,
        //       type
        //     }
        //   })
        //   setMultyChats(previous => [...previous, onePrivChatNormalized])
        // }
      }
      else { alert("Sorry, cant show previous messages right now") }
    })()
  })
  const btnText = isChatOn ? "Hide private chats" : "Show private chats";
  return <>
    <StyledBtn type="button" onClick={() => { showHideChat() }}>
      {`${btnText}`}</StyledBtn>

    {isChatOn && multyChats.length === 0 ? <PrivateChat initialMessages={[]} /> :
      multyChats.map(item => <PrivateChat initialMessages={item} />)}</>
}