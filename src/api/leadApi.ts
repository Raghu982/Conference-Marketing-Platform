import {
  loadData,
  saveData,
} from "../services/storage";

const STORAGE_KEY = "leads";

export const leadApi = {
  getAll() {
    return loadData<any[]>(STORAGE_KEY, []);
  },

  create(lead: any) {
    const leads =
      loadData<any[]>(STORAGE_KEY, []);

    leads.push(lead);

    saveData(STORAGE_KEY, leads);

    return lead;
  },

  delete(id: number) {
    const leads =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      leads.filter(
        (l: any) => l.id !== id
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },

  update(
    id: number,
    updatedLead: any
  ) {
    const leads =
      loadData<any[]>(STORAGE_KEY, []);

    const updated =
      leads.map((l: any) =>
        l.id === id
          ? updatedLead
          : l
      );

    saveData(STORAGE_KEY, updated);

    return updated;
  },
};