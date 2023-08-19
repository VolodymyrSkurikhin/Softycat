import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = 'http://localhost:4000/api';

interface IRegisterData {
  name: string,
  email: string,
  password: string
}

interface ILoginData {
  email: string,
  password: string
}
interface IRegResponse {
  regResponse: AxiosResponse<any, any>,
  loginResponse: AxiosResponse<any, any>
}
interface ILoginResponse {
  loginResponse: AxiosResponse<any, any>
}
interface ILogoutResponse {
  logoutResponse: AxiosResponse<any, any>,
}

export async function registerUser(regData: IRegisterData): Promise<IRegResponse> {
  // let regResponse;
  // let loginResponse;
  try {
    const regResponse = await axios.post('/auth/register', regData);
    console.log(regResponse);
    if (regResponse.status === 201) {
      const loginResponse = await axios.post('auth/login', regData);
      console.log(loginResponse);
      axios.defaults.headers.common['Authorization'] = loginResponse.data.token;
      return ({ regResponse, loginResponse });
    }
    throw new Error(`Unexpected status: ${regResponse.status}`);
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}

export async function loginUser(loginData: ILoginData): Promise<ILoginResponse> {
  try {
    const loginResponse = await axios.post('auth/login', loginData);
    console.log(loginResponse);
    axios.defaults.headers.common['Authorization'] = loginResponse.data.token;
    return ({ loginResponse });
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
export async function logoutUser(): Promise<ILogoutResponse> {
  try {
    const logoutResponse = await axios.post('auth/logout');
    console.log(logoutResponse);
    axios.defaults.headers.common['Authorization'] = "";
    return ({ logoutResponse });
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
