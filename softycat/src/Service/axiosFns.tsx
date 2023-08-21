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
// interface IRegResponse {
//   regResponse: AxiosResponse<any, any>,
//   loginResponse: AxiosResponse<any, any>,
// }
// interface ILoginResponse {
//   loginResponse: AxiosResponse<any, any>
// }
// interface ILogoutResponse {
//   logoutResponse: AxiosResponse<any, any>,
// }

interface ISuccessResult {
  success: true;
  name: string;
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
  // let regResponse;
  // let loginResponse;
  try {
    const regResponse = await axios.post('/auth/register', regData);
    console.log(regResponse);
    // if (regResponse.status === 409) {
    //   // alert("Email is already in use");
    //   return ({ success: false, errorReason: `Email is already in use` });
    // }
    if (regResponse.status === 201) {
      const loginResponse = await axios.post('auth/login', regData);
      console.log(loginResponse);
      axios.defaults.headers.common['Authorization'] = loginResponse.data.token;
      return {
        success: true,
        name: loginResponse.data.name,

      }
      // return ({ success:true,name: });
    } else

      throw new Error(`Unexpected status: ${regResponse.status}`);
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      // alert(`${error.response?.data.message}`);
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
    axios.defaults.headers.common['Authorization'] = loginResponse.data.token;
    return {
      success: true,
      name: loginResponse.data.name,

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
      return error.response?.data.message;
      // throw new Error(`${error.response?.status}`);

    } else {
      // console.log(error);
      throw new Error("Unexpected error occured");
    }
  }
}
