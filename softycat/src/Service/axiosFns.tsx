import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = 'http://localhost:4000/api';

interface IRegisterData {
  name: string,
  email: string,
  password: string
}
// interface ILoginData {
//   name: string,
//   password: string
// }
interface IResponse {
  regResponse: AxiosResponse<any, any>,
  loginResponse: AxiosResponse<any, any>
}

export async function registerUser(regData: IRegisterData): Promise<IResponse> {
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
  // catch (error) {
  //   if (error instanceof Error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   }
  // }
