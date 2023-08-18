import { createContext, useContext, useState } from "react";

interface IUserContext {
  isLoggedIn: boolean,
  username: string,
  logIn(name: string): void,
  logOut(): void
}


const UserContext = createContext<IUserContext>(null!);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const logIn = (name: string) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );

}