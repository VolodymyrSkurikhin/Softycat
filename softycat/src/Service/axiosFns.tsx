import axios from "axios";


axios.defaults.baseURL = 'http://localhost:4000/api';

interface IRegisterData {
  name: string,
  email: string,
  password: string
}

export async function registerUser(data: IRegisterData) {
  try {
    const response = await axios.post('/auth/register', data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}