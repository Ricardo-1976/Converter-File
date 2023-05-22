import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import logger from "@config/logger";
import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/music/Messages/music";

ffmpeg.setFfmpegPath(ffmpegPath.path);

class ConverterMusicUseCase {
  async execute(file: Express.Multer.File, para: string): Promise<void> {
  
    const path = './tmp/music/';

    const name_music = file.originalname.slice(0, -3);

    const name_type = file.mimetype;

    const formats = ['mp3', 'wav', 'ogg'];

    const formt_original = ['audio/wave', 'audio/ogg', 'audio/mpeg', 'video/mp4'];
    
    const format_origin = formt_original.find((formt_origina) => formt_origina === name_type);

    const format = formats.find((format) => format === para);

    if(!format) {
      removeFile(`${path}`+`${file.filename}`);
      throw new AppError(messages.formatSupported);
    }
    
    if(!format_origin) {
      removeFile(`${path}`+`${file.filename}`);
      throw new AppError(messages.fileNotCompatible);
    }

    ffmpeg(path + file.filename)
      .output(path + name_music+para)
      .toFormat(para)
      .on('end', () => {
        logger.info(messages.conversionCompleted);
        removeFile(`${path}`+`${file.filename}`);
      })
      .on('error', (err) => {
        logger.error(messages.errorConversion, err); 
        removeFile(`${path}`+`${file.filename}`);
      })
      .run();
  };
}

export { ConverterMusicUseCase };
