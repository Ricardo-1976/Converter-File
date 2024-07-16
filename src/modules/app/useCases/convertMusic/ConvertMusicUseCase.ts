import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/app/Messages/messages";
import logger from "@config/logger";

ffmpeg.setFfmpegPath(ffmpegPath.path);

interface IRequest {
  to: any;
  file: any;
}
class ConvertMusicUseCase {
  async execute({file, to }: IRequest): Promise<void> {
  
    const path = './tmp/music/';
   
    const name_music = file.originalname.slice(0, -3);
    const name_type = file.mimetype;

    const formats = ['mp3', 'wav', 'ogg', 'flac'];
    const formt_original = ['audio/wave', 'audio/ogg', 'audio/mpeg', 'video/mp4', 'audio/x-flac'];
    
    const format_origin = formt_original.includes(name_type);
    const format = formats.includes(file.originalname.slice(-3));

    if(!format) {
      removeFile(`${path}`+`${file.filename}`);
      throw new AppError(messages.formatSupported);
    }
    
    if(!format_origin) {
      removeFile(`${path}`+`${file.filename}`);
      throw new AppError(messages.fileNotCompatible);
    }

    ffmpeg(path + file.filename)
      .output(path + name_music+to)
      .toFormat(to)
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

export { ConvertMusicUseCase };
