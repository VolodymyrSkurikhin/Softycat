import { ChatMessagesContainer, MyMessage, TimeStamp, YourMessage } from "./ChatMessages.styled";

interface IItem {
  id: string,
  message: string,
  type: string,
  time: string
}

export const ChatMessages = (items: IItem[] = []): any => {
  const elements = items.map(({ id, message, type, time }) => {
    const element = type === "yours" ? (<YourMessage key={id}>{message}<TimeStamp>{time}</TimeStamp></YourMessage>)
      : (<MyMessage key={id}>{message}<TimeStamp>{time}</TimeStamp></MyMessage>);
    return element
  })
  return (<ChatMessagesContainer>{elements}</ChatMessagesContainer>)
}