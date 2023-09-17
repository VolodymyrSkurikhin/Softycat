import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../Service/LocalStorageFns";

interface IUserContext {
  // isLoggedIn: boolean,
  name: string,
  email: string,
  avatarURL: string,
  isShown: boolean,
  token: string,
  logIn(name: string, email: string, avatarURL: string, isShown: boolean, token: string): void,
  showHide(newIsShown: boolean): void,
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const userInfo = loadUser('user');
    if (!userInfo) { return };
    setUsername(userInfo.name);
    setEmail(userInfo.email);
    setAvatarURL(userInfo.avatarURL);
    setIsShown(userInfo.isShown);
    setToken(userInfo.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    console.log(isShown);
  }, [name, email, avatarURL, isShown, token]);
  const logIn = (name: string, email: string, avatarURL: string, isShown: boolean, token: string) => {
    setUsername(name);
    setEmail(email);
    setAvatarURL(avatarURL);
    setIsShown(isShown);
    setToken(token)
  };
  const showHide = (newIsShown: boolean) => setIsShown(newIsShown);
  // const hide = () => setIsShown(false);

  const logOut = () => {
    // setIsLoggedIn(false);
    setToken('');
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ name, email, avatarURL, isShown, token, logIn, showHide, logOut }}>
      {children}
    </UserContext.Provider>
  );

}