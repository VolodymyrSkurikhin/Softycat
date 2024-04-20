import { BtnToLeave, BtnToHide } from "./ChatForm.styled";
import { ChatMessagesContainer, MyMessage, TimeStamp, YourMessage, Name } from "./ChatMessages.styled";

export interface IItem {
  author: string,
  id: string,
  message: string,
  type: "my" | "yours",
  time: string
}

interface IProps {
  items: IItem[],
  onLeave: () => void,
  openClose: () => void
}

export const ChatMessages: React.FC<IProps> = ({ items = [], onLeave, openClose }: IProps) => {
  const elements = items.map(({ author, id, message, type, time }) => {
    const element = type === "yours" ? (<YourMessage key={id}>{message}
      <Name>{author}</Name>
      <TimeStamp>{time}</TimeStamp>
    </YourMessage>)
      : (<MyMessage key={id}>{message}
        <Name>{author}</Name>
        <TimeStamp>{time}</TimeStamp>
      </MyMessage>);
    return element
  })
  return (<ChatMessagesContainer>{elements}
    <BtnToLeave onClick={() => onLeave()}>Leave chat</BtnToLeave>
    <BtnToHide onClick={() => openClose()}>Hide chat</BtnToHide>
  </ChatMessagesContainer>)
}