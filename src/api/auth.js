import instance from ".";
import jwt_decode from "jwt-decode";

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  try {
    //to change and accept the image as a binary file
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);
    storeToken(localStorage.getItem("token"));
    const { data } = await instance.post("/auth/register", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const me = async () => {
  try {
    const { data } = await instance.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await instance.get("/auth/users");
    return data;
  } catch (error) {
    console.log(error);
  }
};
const storeToken = () => {
  localStorage.getItem("Token");
};

const checkToken = () => {
  const token = localStorage.getItem("Token");
  if (token) {
    const decode = jwt_decode(token);
    console.log(token);
    if (token.exp < Date.now() / 1000) {
      //in case token is less then current time
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};

export { login, register, me, getAllUsers };
