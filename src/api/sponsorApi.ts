import {
  loadData,
  saveData,
} from "../services/storage";

const STORAGE_KEY = "sponsors";

export const sponsorApi = {
  getAll() {
    return loadData<any[]>(STORAGE_KEY, []);
  },

  create(sponsor: any) {
    const sponsors =
      loadData<any[]>(STORAGE_KEY, []);

    sponsors.push(sponsor);

    saveData(STORAGE_KEY, sponsors);

    return sponsor;
  },

  delete(id: number) {
    const sponsors =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      sponsors.filter(
        (s: any) => s.id !== id
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },

  update(
    id: number,
    updatedSponsor: any
  ) {
    const sponsors =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      sponsors.map((s: any) =>
        s.id === id
          ? updatedSponsor
          : s
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },
};