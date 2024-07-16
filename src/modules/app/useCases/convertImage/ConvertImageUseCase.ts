import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/app/Messages/messages";
import sharp from 'sharp';

interface IRequest {
  to: any;
  file: any;
}
class ConvertImageUseCase {
  async execute({file, to }: IRequest): Promise<void> {
    const sharp = require('sharp');
    const path = './tmp/image/';
  //  {
  //   const name_music = file.originalname.slice(0, -3);
  //   const name_type = file.mimetype;

  //   const formats = ['mp3', 'wav', 'ogg', 'flac'];
  //   const formt_original = ['audio/wave', 'audio/ogg', 'audio/mpeg', 'video/mp4', 'audio/x-flac'];
    
  //   const format_origin = formt_original.includes(name_type);
  //   const format = formats.includes(file.originalname.slice(-3));

  //   if(!format) {
  //     removeFile(`${path}`+`${file.filename}`);
  //     throw new AppError(messages.formatSupported);
  //   }
    
  //   if(!format_origin) {
  //     removeFile(`${path}`+`${file.filename}`);
  //     throw new AppError(messages.fileNotCompatible);
  //   }
  // }
  
    await sharp(path).toFormat('svg').toFile(path);
    removeFile(`${path}`+`${file.filename}`);

  };
}

export { ConvertImageUseCase };
