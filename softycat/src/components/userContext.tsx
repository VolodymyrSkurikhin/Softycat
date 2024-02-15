import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../Service/LocalStorageFns";

interface IUserContext {
  // isLoggedIn: boolean,
  _id: string,
  name: string,
  email: string,
  avatarURL: string,
  isShown: boolean,
  token: string,
  logIn(_id: string, name: string, email: string, avatarURL: string, isShown: boolean, token: string): void,
  showHide(newIsShown: boolean): void,
  logOut(): void,
  setContext(contKey: string, contValue: string): void
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
  const [_id, set_id] = useState("");
  useEffect(() => {
    const userInfo = loadUser('user');
    if (!userInfo) { return };
    set_id(userInfo._id);
    setUsername(userInfo.name);
    setEmail(userInfo.email);
    setAvatarURL(userInfo.avatarURL);
    setIsShown(userInfo.isShown);
    setToken(userInfo.token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userInfo.token;
    console.log('Bearer ' + userInfo.token);
    console.log(isShown);
  }, [_id, name, email, avatarURL, isShown, token]);
  const logIn = (_id: string, name: string, email: string, avatarURL: string, isShown: boolean, token: string) => {
    set_id(_id);
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
    localStorage.removeItem("user");
  };

  const setContext = (contKey: string, contValue: string) => {
    if (contKey === "name") {
      setUsername(contValue);
      return
    }
    if (contKey === "email") {
      setEmail(contValue);
      return
    }
    if (contKey === "avatarURL") {
      setAvatarURL(contValue);
      return
    }
  }

  return (
    <UserContext.Provider value={{ _id, name, email, avatarURL, isShown, token, logIn, showHide, logOut, setContext }}>
      {children}
    </UserContext.Provider>
  );

}