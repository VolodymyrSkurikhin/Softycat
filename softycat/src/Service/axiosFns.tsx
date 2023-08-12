import axios from "axios";


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

export async function registerUser(regData: IRegisterData) {
  const unMessage = "Unexpected error occured";
  try {
    const regResponse = await axios.post('/auth/register', regData);
    console.log(regResponse);
    if (regResponse.status === 201) {
      const loginResponse = await axios.post('auth/login', regData);
      console.log(loginResponse);
    }
    //   } catch (error) {
    //     // console.error(error);
    //     // let err = axiosError;
    //     return {
    //       err: {
    //         status: error.response?.status,
    //         message: error.message
    //       }
    //     }
    //   }
    // }
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      console.log(error.response?.data);

    } else {
      // console.log(error);
      return unMessage
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
