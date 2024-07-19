import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/app/Messages/messages";
import logger from "@config/logger";
import { removeCharsAfterDot } from "@utils/removeCharsAfterDot";
import { IFileDTO } from "@modules/app/dtos/fileDto";

ffmpeg.setFfmpegPath(ffmpegPath.path);

class ConvertMusicUseCase {
  async execute({file, to }: IFileDTO): Promise<void> {
  
    const path = './tmp/music/';
    const name_music = removeCharsAfterDot(file.originalname);
    const name_type = file.mimetype;

    const formats = ['mp3', 'wav', 'ogg', 'flac'];
    const formt_original = [
      'audio/wave', 'audio/ogg', 'audio/mpeg', 'video/mp4', 
      'audio/x-flac'
    ];
    
    const format_origin = formt_original.includes(name_type);
    const format = formats.includes(to);

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
