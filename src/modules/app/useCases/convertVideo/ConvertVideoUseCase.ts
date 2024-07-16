import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import logger from "@config/logger";
import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/app/Messages/messages";

ffmpeg.setFfmpegPath(ffmpegPath.path);

interface IRequest {
  to: any;
  file: any;
}
class ConvertVideoUseCase {
  async execute({file, to }: IRequest): Promise<void> {
  
    const path = './tmp/video/';
    const name_video = file.originalname.slice(0, -3);
    const name_type = file.mimetype;

    const formats = ['mp4', 'avi', 'mkv', 'mov', 'flv'];
    const formt_original = [
      'video/mp4', 'video/x-msvideo', 'video/x-matroska', 
      'video/quicktime', 'video/x-flv'
    ];
    
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
      .output(path + name_video+to)
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

export { ConvertVideoUseCase };
