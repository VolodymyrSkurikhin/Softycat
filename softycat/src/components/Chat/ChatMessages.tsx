import { ChatMessagesContainer, MyMessage, TimeStamp, YourMessage } from "./ChatMessages.styled";

export interface IItem {
  author: string,
  id: string,
  message: string,
  type: "my" | "yours",
  time: string
}

interface IProps {
  items: IItem[];
}

export const ChatMessages: React.FC<IProps> = ({ items = [] }: IProps) => {
  const elements = items.map(({ author, id, message, type, time }) => {
    const element = type === "yours" ? (<YourMessage key={id}>{author}   {message}<TimeStamp>{time}</TimeStamp></YourMessage>)
      : (<MyMessage key={id}>{author}    {message}<TimeStamp>{time}</TimeStamp></MyMessage>);
    return element
  })
  return (<ChatMessagesContainer>{elements}</ChatMessagesContainer>)
}