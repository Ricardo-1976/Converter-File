import fs from "fs";

export function removeFile(directory) {
  fs.unlink(directory, (error) => {
    if (error) throw error;
    console.log("File deleted");
  });
}
