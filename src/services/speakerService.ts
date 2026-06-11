import axios from "axios";

const API_URL =
  "http://localhost:5000/api/speakers";

export const speakerService = {
  async getAll() {
    const response =
      await axios.get(API_URL);

    return response.data;
  },

  async create(speaker: any) {
    const response =
      await axios.post(
        API_URL,
        speaker
      );

    return response.data;
  },

  async update(
    id: number,
    speaker: any
  ) {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        speaker
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