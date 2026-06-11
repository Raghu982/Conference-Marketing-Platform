import { speakerService } from "../services/speakerService";

export async function getSpeakers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        speakerService.getAll()
      );
    }, 500);
  });
}