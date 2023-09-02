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

interface ISuccessResult {
  success: true;
  name: string;
  email: string,
  avatarURL: string
}
export interface IUser {
  _id: string,
  name: string,
  email: string,
  avatarURL: string,
  isShown: boolean
}
interface IAllUsersSuccessResult {
  success: true;
  users: IUser[]
}

interface IErrorResult {
  success: false;
  errorReason: string;
}

// const res = await registerUser(...);
// if (res.success) {
//    const name = res.name;
//    logIn(name);
// } else {
//    alert(res.errorReason);  
// }

// :Promise<SuccessResult | ErrorResult>


export async function registerUser(regData: IRegisterData): Promise<ISuccessResult | IErrorResult> {
  try {
    const regResponse = await axios.post('/auth/register', regData);
    console.log(regResponse);
    // if (regResponse.status === 409) {
    //   alert("Email is already in use");
    //   return ({ success: false, errorReason: `Email is already in use` });
    // }
    if (regResponse.status === 201) {
      const loginResponse = await axios.post('auth/login', regData);
      console.log(loginResponse);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginResponse.data.token;
      return {
        success: true,
        name: loginResponse.data.name,
        email: loginResponse.data.email,
        avatarURL: loginResponse.data.avatarURL,
      }
      // return ({ success:true,name: });
    } else

      throw new Error(`Unexpected status: ${regResponse.status}`);
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      alert(`${error.response?.data.message}`);
      return {
        success: false,
        errorReason: `${error.response?.data.message}`
      }

      // throw new Error(`${error.response?.data.message}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}

export async function loginUser(loginData: ILoginData): Promise<ISuccessResult | IErrorResult> {
  try {
    const loginResponse = await axios.post('auth/login', loginData);
    console.log(loginResponse);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginResponse.data.token;
    return {
      success: true,
      name: loginResponse.data.name,
      email: loginResponse.data.name,
      avatarURL: loginResponse.data.name,
    };
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      return {
        success: false,
        errorReason: `${error.response?.data.message}`
      }
      // throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
export async function logoutUser(): Promise<AxiosResponse<any, any>> {
  try {
    const logoutResponse = await axios.post('auth/logout');
    console.log(logoutResponse);
    axios.defaults.headers.common['Authorization'] = "";
    return logoutResponse;
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      // return error.response?.data.message;
      throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
// interface IShown { isShown: boolean }
// interface IShownSuccessResult {
//   isShown: boolean
// }
// interface IShownErrorResult {
//   errorReason: string
// }
export async function updateIsShown(): Promise<boolean> {
  try {
    const user = await axios.patch('auth/isshown');
    return user.data.isShown;
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      throw new Error(`${error.response?.data}`);
      // return {
      //   success: false,
      //   errorReason: `${error.response?.data.message}`
      // };
    }
    // throw new Error(`${error.response?.status}`);

    else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
export async function getAllUsers(): Promise<IAllUsersSuccessResult | IErrorResult> {
  try {
    const res = await axios.get('auth/allusers');
    return {
      success: true,
      users: res.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      alert(`${error.response?.data.message}`);
      return {
        success: false,
        errorReason: `${error.response?.data.message}`
      }

      // throw new Error(`${error.response?.data.message}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
