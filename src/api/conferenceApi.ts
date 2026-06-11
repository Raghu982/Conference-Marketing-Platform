import {
  loadData,
  saveData,
} from "../services/storage";

const STORAGE_KEY = "conferences";

export const conferenceApi = {
  getAll() {
    return loadData<any[]>(STORAGE_KEY, []);
  },

  create(conference: any) {
    const conferences =
  loadData<any[]>(STORAGE_KEY, []);

    conferences.push(conference);

    saveData(
      STORAGE_KEY,
      conferences
    );

    return conference;
  },

  delete(id: number) {
    const conferences =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      conferences.filter(
        (c: any) => c.id !== id
      );

    saveData(
      STORAGE_KEY,
      updated
    );

    return updated;
  },

  update(
    id: number,
    updatedConference: any
  ) {
    const conferences =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      conferences.map((c: any) =>
        c.id === id
          ? updatedConference
          : c
      );

    saveData(
      STORAGE_KEY,
      updated
    );

    return updated;
  },
};
