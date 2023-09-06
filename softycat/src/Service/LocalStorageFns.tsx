interface IUser {
  name: string,
  email: string,
  avatarURL: string,
  isShown: boolean,
  token: string
};

export const saveUser = (key: string, value: IUser): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error: any) {
    console.error("Set state error: ", error.message);
    alert(error.message);
  }
};

export const loadUser = (key: string): IUser | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error: any) {
    console.error("Get state error: ", error.message);
    alert(error.message);
  }
};



export const saveString = (key: string, value: string): void => {
  try {
    // const serializedState = JSON.stringify(value);
    localStorage.setItem(key, value);
  } catch (error: any) {
    console.error("Set state error: ", error.message);
    alert(error.message);
  }
};

export const loadString = (key: string): string | undefined => {
  try {
    const value: string | null = localStorage.getItem(key);
    return value === null ? undefined : value;
  } catch (error: any) {
    console.error("Get state error: ", error.message);
    alert(error.message);
  }
};
export const saveBool = (key: string, value: boolean): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error: any) {
    console.error("Set state error: ", error.message);
    alert(error.message);
  }
};

export const loadBool = (key: string): boolean | undefined => {
  try {
    const serializedState: null | string = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error: any) {
    console.error("Get state error: ", error.message);
    alert(error.message);
  }
};

