import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";
import { Socket, io } from "socket.io-client";
// import axios from "axios";
// import { loadUser } from "../Service/LocalStorageFns";


interface ISocketContext {
  // isLoggedIn: boolean,
  socket: Socket | null
}


// interface IUser {
//   username: string,
//   email: string,
//   avatarURL: string,
//   isShown: boolean,
// }

const SocketContext = createContext<ISocketContext>(null!);
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: any) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token } = useUser();
  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:4000", { autoConnect: false });
      newSocket.auth = { token };
      newSocket.on("connect_error", (err) => {
        alert(`Chat connection error ${err.message}`)
      });
      newSocket.connect();
      setSocket(newSocket);
    }
  }, [token])


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );

}