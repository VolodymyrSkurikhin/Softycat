import axios from "axios";
import { loadUser } from "./LocalStorageFns";

export function restoreToken(): void {
  const result = loadUser("user");
  if (!result) { return };
  const { token } = result;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}