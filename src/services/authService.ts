import axios from "axios";

const API_BASE_URL =
  "http://localhost:5000/api/auth";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const registerUser = async (
  userData: RegisterRequest
) => {
  const response = await axios.post(
    `${API_BASE_URL}/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (
  credentials: LoginRequest
) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    credentials
  );

  return response.data;
};

const authService = {
  registerUser,
  loginUser,
};

export default authService;