import { useState } from "react";

import { ChatFormStyled, Input, Btn } from "../Chat/ChatForm.styled";

interface IChatFormProps {
  onSubmit: (message: string, peer: string) => void;
}

export const PrivateChatInvitForm: React.FC<IChatFormProps> = ({ onSubmit }: IChatFormProps) => {
  const [state, setState] = useState({ message: "", peer: "" });
  const handleChange = ({ elements }: any) => {
    const { name, value } = elements.currentTtarget;
    setState(prevState => {
      // const newMessage = value;
      return ({ ...prevState, [name]: value })
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { message, peer } = state;
    // onSubmit({ ...state });
    onSubmit(message, peer);
    setState({ message: "", peer: "" })
  }

  const { message, peer } = state;

  return (<ChatFormStyled onSubmit={handleSubmit}>
    <Input type="text" name="peer" value={peer} onChange={handleChange} placeholder="Type your correspondent`s name" autoComplete="off" />
    <Input type="text" name="message" value={message} onChange={handleChange} placeholder="Type your message" autoComplete="off" />
    <Btn>
      Send first message
    </Btn>
  </ChatFormStyled>)
}