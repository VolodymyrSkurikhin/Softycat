import { useState } from "react";

import { ChatFormStyled, Input, Btn } from "../Chat/ChatForm.styled";
// import { nanoid } from "nanoid";

// interface IP { peer: string; message: string }

interface IChatFormProps {
  onSubmit: (peer: string, message: string) => void;
}

export const PrivateChatInvitForm: React.FC<IChatFormProps> = ({ onSubmit }: IChatFormProps) => {
  const [state, setState] = useState({ peer: "", message: "" });
  const handleChange = ({ target: { value, name } }: any) => {
    // const { name, value } = target;
    setState(prevState => {
      return ({ ...prevState, [name]: value.trim() })
    })
  }
  const handleSubmit = (e: any) => {
    const isDisable = Object.values(state).some(v => !v);
    if (isDisable) {
      alert("Enter name of your correspondent and message, please!");
      return
    }
    e.preventDefault();
    const { peer, message } = state;
    // onSubmit({ ...state });

    onSubmit(peer, message);
    setState({ peer: "", message: "" })
  }

  const { peer, message } = state;

  return (<ChatFormStyled onSubmit={handleSubmit}>
    <Input type="text" name="peer" value={peer} onChange={handleChange} placeholder="Type your friend`s name" autoComplete="off" />
    <Input type="text" name="message" value={message} onChange={handleChange} placeholder="Type your message" autoComplete="off" />
    <Btn>
      Invite your friend
    </Btn>
  </ChatFormStyled>)
}