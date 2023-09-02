import { createContext, useContext, useState } from "react";

interface IUserContext {
  isLoggedIn: boolean,
  username: string,
  email: string,
  avatarURL: string,
  isShown: boolean,
  logIn(name: string, email: string, avatarURL: string): void,
  showHide(isShown: boolean): void,
  logOut(): void
}


// interface IUser {
//   username: string,
//   email: string,
//   avatarURL: string,
//   isShown: boolean,
// }

const UserContext = createContext<IUserContext>(null!);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const logIn = (username: string, email: string, avatarURL: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    setEmail(email);
    setAvatarURL(avatarURL);
  };
  const showHide = (isShown: boolean) => setIsShown(isShown);
  // const hide = () => setIsShown(false);

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, email, avatarURL, isShown, logIn, showHide, logOut }}>
      {children}
    </UserContext.Provider>
  );

}