import logger from "@config/logger";
import fs from "fs";

export function removeFile(directory) {
  fs.unlink(directory, (error) => {
    if (error) throw error;
    logger.info("File deleted");
  });
}
