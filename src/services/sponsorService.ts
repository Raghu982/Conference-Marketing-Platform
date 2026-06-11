import axios from "axios";

const API_URL =
  "http://localhost:5000/api/sponsors";

export const sponsorService = {
  async getAll() {
    const response =
      await axios.get(API_URL);

    return response.data;
  },

  async create(sponsor: any) {
    const response =
      await axios.post(
        API_URL,
        sponsor
      );

    return response.data;
  },

  async update(
    id: number,
    sponsor: any
  ) {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        sponsor
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