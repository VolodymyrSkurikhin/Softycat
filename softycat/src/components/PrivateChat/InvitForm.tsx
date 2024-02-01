import { useState } from "react";

import { ChatFormStyled, Input, Btn } from "../Chat/ChatForm.styled";
// import { nanoid } from "nanoid";

interface IChatFormProps {
  onSubmit: (peer: string) => void;
}

export const PrivateChatInvitForm: React.FC<IChatFormProps> = ({ onSubmit }: IChatFormProps) => {
  const [state, setState] = useState({ peer: "" });
  const handleChange = ({ elements }: any) => {
    const { name, value } = elements.currentTtarget;
    setState(prevState => {
      return ({ ...prevState, [name]: value })
    })
  }
  const handleSubmit = (e: any) => {
    const isDisable = Object.values(state).some(v => !v);
    if (isDisable) {
      alert("Enter name of your correspondent, please!");
      return
    }
    e.preventDefault();
    const { peer } = state;
    // onSubmit({ ...state });

    onSubmit(peer);
    setState({ peer: "" })
  }

  const { peer } = state;

  return (<ChatFormStyled onSubmit={handleSubmit}>
    <Input type="text" name="peer" value={peer} onChange={handleChange} placeholder="Type your correspondent`s name" autoComplete="off" />
    {/* <Input type="text" name="message" value={message} onChange={handleChange} placeholder="Type your message" autoComplete="off" /> */}
    <Btn>
      Invite your friend
    </Btn>
  </ChatFormStyled>)
}