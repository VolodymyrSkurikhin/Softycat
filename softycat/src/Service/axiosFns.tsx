import axios from "axios";


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
  avatarURL: string,
  isShown: boolean,
  token: string
}
export interface IUser {
  _id: string,
  name: string,
  email: string,
  avatarURL: string,
  isShown: boolean
}

interface ICat {
  _id: string,
  name: string,
  birthday: string,
  breed: string,
  catImageURL: string,
  forSale: boolean
}

interface IAddCat {
  name: string,
  birthday: string,
  breed: string,
  photo: File,
  forSale: boolean
}

interface IAddedCat {
  _id: string,
  name: string,
  birthday: string,
  breed: string,
  catImageURL: string[],
  forSale: boolean
}

interface IAddedCatSuccessResult {
  success: true,
  cat: IAddedCat
}

interface IAllCatsSuccessResult {
  success: true,
  cats: ICat[]
}

interface IAllUsersSuccessResult {
  success: true;
  users: IUser[]
}

interface IErrorResult {
  success: false;
  errorReason: string;
}

interface ILogoutSuccessResult {
  success: true;
  logoutMessage: string;
}

interface ILogoutErrorResult {
  success: false;
  errorReason: string;
  errorStatus: number;
}
interface IUpdateIsShownSuccessResult {
  success: true,
  newIsShown: boolean
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
        isShown: loginResponse.data.isShown,
        token: loginResponse.data.token
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
      email: loginResponse.data.email,
      avatarURL: loginResponse.data.avatarURL,
      isShown: loginResponse.data.isShown,
      token: loginResponse.data.token
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
export async function logoutUser(): Promise<ILogoutSuccessResult | ILogoutErrorResult> {
  try {
    const logoutResponse = await axios.post('auth/logout');
    console.log(logoutResponse);
    // if (logoutResponse.status === 200) {
    axios.defaults.headers.common['Authorization'] = "";
    return {
      success: true,
      logoutMessage: logoutResponse.data.message
    }
    // }
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      if (error.response?.status === 401) {
        return {
          success: false,
          errorReason: error.response?.data.message,
          errorStatus: 401
        };
        // return error.response?.data.message;
      } throw new Error(`${error.response?.status}`);

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
export async function updateIsShown(): Promise<IUpdateIsShownSuccessResult | ILogoutErrorResult> {
  try {
    const res = await axios.patch('auth/isshown');
    return {
      success: true,
      newIsShown: res.data
    }
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      if (error.response?.status === 401) {
        return {
          success: false,
          errorReason: error.response?.data.message,
          errorStatus: 401
        };
      } throw new Error(`${error.response?.status}`);
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

export async function getAllCats(ownerId: string): Promise<IAllCatsSuccessResult | IErrorResult> {
  try {
    const res = await axios.get(`cats/${ownerId}`);
    return {
      success: true,
      cats: res.data
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
    } else {
      throw new Error("Unexpected error occured");
    }
  }
}

export async function addCat(data: IAddCat): Promise<IAddedCatSuccessResult | IErrorResult> {
  try {
    const res = await axios.postForm(`cats/`,
      data
    );
    return {
      success: true,
      cat: res.data
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
    } else {
      throw new Error("Unexpected error occured");
    }
  }
}

export async function removeCat(id: string): Promise<any> {
  try {
    const response = await axios.delete(`cats/${id}`);
    console.log(response);
    return response
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error);
      // alert(`${error.response?.data.message}`);
      return error;
      // success: false,
      // errorReason: `${error.response?.data.message}`

    } else {
      throw new Error("Unexpected error occured");
    }
  }
}






