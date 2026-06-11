import axios from "axios";

const API_URL =
  "http://localhost:5000/api/conferences";

export const conferenceService = {
  async getAll() {
    const response =
      await axios.get(API_URL);

    return response.data;
  },

  async create(conference: any) {
    const response =
      await axios.post(
        API_URL,
        conference
      );

    return response.data;
  },

  async update(
    id: number,
    conference: any
  ) {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        conference
      );

    return response.data;
  },

  async delete(id: number) {
    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
  },
};