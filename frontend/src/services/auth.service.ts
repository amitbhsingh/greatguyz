import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

const register = (userData: UserData) => {
  return axios.post(API_URL + "signup", userData);
};

const login = (loginData: LoginData) => {
  return axios
    .post(API_URL + "signin", loginData)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
