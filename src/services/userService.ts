import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
}

export const createUser = async (
  data: CreateUserRequest
) => {
  const response =
    await axios.post(
      API_URL,
      data
    );

  return response.data;
};

export const getUsers = async () => {
  const response =
    await axios.get(API_URL);

  return response.data;
};

export const getUser = async (
  id: number
) => {
  const response =
    await axios.get(
      `${API_URL}/${id}`
    );

  return response.data;
};

export const updateUser = async (
  id: number,
  data: {
    name: string;
    email: string;
    role: string;
  }
) => {
  const response =
    await axios.put(
      `${API_URL}/${id}`,
      data
    );

  return response.data;
};

export const deleteUser = async (
  id: number
) => {
  const response =
    await axios.delete(
      `${API_URL}/${id}`
    );

  return response.data;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};