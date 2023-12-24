import { useState } from "react";


import { ChatFormStyled, Input, Btn } from "./ChatForm.styled";

export const ChatForm = ({ onSubmit }: any) => {
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
    onSubmit(state);
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

