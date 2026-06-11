import axios from "axios";

const API_URL =
  "http://localhost:5000/api/leads";

export const leadService = {
  async getAll() {
    const response =
      await axios.get(API_URL);

    return response.data;
  },

  async create(lead: any) {
    const response =
      await axios.post(
        API_URL,
        lead
      );

    return response.data;
  },

  async update(
    id: number,
    lead: any
  ) {
    const response =
      await axios.put(
        `${API_URL}/${id}`,
        lead
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