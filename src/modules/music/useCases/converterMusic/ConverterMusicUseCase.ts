import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import logger from "@config/logger";
import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";

ffmpeg.setFfmpegPath(ffmpegPath.path);

class ConverterMusicUseCase {
  async execute(file: Express.Multer.File, base: string, para: string): Promise<void> {
  
    const name = file.filename.slice(-3);

    if (name != 'mp4') {
      removeFile(`./tmp/music/${file.filename}`);
      throw new AppError('Arquivo nao e compativel com a base');
    } 

    const fileName = para;

    const name_music = file.originalname.slice(0, -3);

    ffmpeg('./tmp/music/' + file.filename)
      .toFormat(para)
      .on("end", () => { 
        removeFile(`./tmp/music/${file.filename}`);
      })
      .on("error", (error) => {
        logger.error(error);
        removeFile(`./tmp/music/${file.filename}`);
      })
      .saveToFile(`./tmp/music/` + name_music+fileName);
      logger.info('Conversion completed.')
  };
}

export { ConverterMusicUseCase };
