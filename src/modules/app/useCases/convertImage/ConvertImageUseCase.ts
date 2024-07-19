import { removeFile } from "@utils/file";
import { AppError } from "@shared/errors/AppError";
import { messages } from "@modules/app/Messages/messages";
import sharp from 'sharp';
import logger from "@config/logger";
import { removeCharsAfterDot } from "@utils/removeCharsAfterDot";
import { IFileDTO } from "@modules/app/dtos/fileDto";

class ConvertImageUseCase {
  async execute({file, to }: IFileDTO): Promise<void> {
    
    const path = './tmp/image/';
    const name_image = removeCharsAfterDot(file.originalname)
    const name_type = file.mimetype;

    const formats = ['jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg'];
    const formt_original = [
      'image/jpeg', 'image/png', 'image/bmp', 'image/gif', 
      'image/tiff', 'image/webp', 'image/svg+xml'
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
  
  sharp(path + file.filename)
  .rotate()
  .toFile(path + name_image+to)
  .then( data => {logger.info(messages.conversionCompleted), removeFile(`${path}`+`${file.filename}`)})
  .catch( err => {logger.error(messages.errorConversion, err),removeFile(`${path}`+`${file.filename}`);});

  };
}

export { ConvertImageUseCase };
