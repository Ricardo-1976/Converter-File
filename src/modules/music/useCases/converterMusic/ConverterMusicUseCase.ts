import logger from "@config/logger";
import { response, request } from "express";
import ffmpeg from "fluent-ffmpeg";

class ConverterMusicUseCase {
  async execute( file: Express.Multer.File ): Promise<void> {
  const fileName = ".mp3";

  ffmpeg('./tmp/music/' + file.filename)
    .toFormat("mp3")
    .on("end", () => {
      return response.download(__dirname + fileName, (error) => {
        if (error) throw error;
        console.log("conversion success");
        // Remove file
      });
    })
    .on("error", (error) => {
      console.log(error);
      // Remove file
    }).saveToFile('./tmp/music/' + file.filename+fileName)
  } 
}  
export { ConverterMusicUseCase };
