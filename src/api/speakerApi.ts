import {
  loadData,
  saveData,
} from "../services/storage";

const STORAGE_KEY = "speakers";

export const speakerApi = {
  getAll() {
    return loadData<any[]>(STORAGE_KEY, []);
  },

  create(speaker: any) {
    const speakers =
      loadData<any[]>(STORAGE_KEY, []);

    speakers.push(speaker);

    saveData(STORAGE_KEY, speakers);

    return speaker;
  },

  delete(id: number) {
    const speakers =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      speakers.filter(
        (s: any) => s.id !== id
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },

  update(
    id: number,
    updatedSpeaker: any
  ) {
    const speakers =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      speakers.map((s: any) =>
        s.id === id
          ? updatedSpeaker
          : s
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },
};