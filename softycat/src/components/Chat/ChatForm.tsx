import { useState } from "react";


import { ChatFormStyled, Input, Btn } from "./ChatForm.styled";

interface IChatFormProps {
  onSubmit: (message: string) => void;
}

export const ChatForm: React.FC<IChatFormProps> = ({ onSubmit }: IChatFormProps) => {
  const [state, setState] = useState({ message: "" });
  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setState(prevState => {
      // const newMessage = value;
      return ({ ...prevState, [name]: value })
    })
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { message } = state;
    // onSubmit({ ...state });
    onSubmit(message);
    setState({ message: "" })
  }

  const { message } = state;

  return (<ChatFormStyled onSubmit={handleSubmit}>
    <Input type="text" name="message" value={message} onChange={handleChange} placeholder="Type your message" autoComplete="off" />
    <Btn>
      Send message
    </Btn>
  </ChatFormStyled>)
}

