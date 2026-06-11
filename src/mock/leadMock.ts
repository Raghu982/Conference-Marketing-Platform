import { leadService } from "../services/leadService";

export async function getLeads() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        leadService.getAll()
      );
    }, 500);
  });
}