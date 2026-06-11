import { sponsorService } from "../services/sponsorService";

export async function getSponsors() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        sponsorService.getAll()
      );
    }, 500);
  });
}