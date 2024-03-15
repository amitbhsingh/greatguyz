import axios, { AxiosResponse } from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8080/api/test/";

// Assuming the structure of your response objects, you may need to adjust these
interface PublicContentResponse {
  // define the structure of the public content response
}

interface UserBoardResponse {
  // define the structure of the user board response
}

interface ModeratorBoardResponse {
  // define the structure of the moderator board response
}

interface AdminBoardResponse {
  // define the structure of the admin board response
}

const getPublicContent = (): Promise<AxiosResponse<PublicContentResponse>> => {
  return axios.get<PublicContentResponse>(API_URL + "all");
};

const getUserBoard = (): Promise<AxiosResponse<UserBoardResponse>> => {
  return axios.get<UserBoardResponse>(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = (): Promise<AxiosResponse<ModeratorBoardResponse>> => {
  return axios.get<ModeratorBoardResponse>(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = (): Promise<AxiosResponse<AdminBoardResponse>> => {
  return axios.get<AdminBoardResponse>(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
