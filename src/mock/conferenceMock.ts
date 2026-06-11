import { conferenceService } from "../services/conferenceService";

export async function getConferences() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        conferenceService.getAll()
      );
    }, 500);
  });
}