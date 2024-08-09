'use strict';

const fs = require('fs').promises;
import { removeCharsAfterDot } from '@utils/removeCharsAfterDot';
import type { IFileDTO } from '@modules/app/dtos/fileDto';
import { removeFile } from '@utils/file';
import { AppError } from '@shared/errors/AppError';
import { messages } from '@modules/app/Messages/messages';
import logger from '@config/logger';

class ConvertDocsUseCase {
  async execute({ file, to}: IFileDTO): Promise<void> {
    const path = './tmp/doc/';
    const name_doc = removeCharsAfterDot(file.originalname);
    const name_type = file.mimetype;
    const libre = require('libreoffice-convert');
    libre.convertAsync = require('util').promisify(libre.convert);
   
    const formats = ['pdf', 'doc', 'docx', 'odt', 'txt', 'rtf'];

    const format_original = ['application/pdf', 'application/msword', 'application/vnd.oasis.opendocument.text', 'text/plain', 'application/rtf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    const format_origin = format_original.includes(name_type);
    const format = formats.includes(to);

    if (!format) {
      removeFile(`${path}${file.filename}`);
      throw new AppError(messages.formatSupported);
    }

    if (!format_origin) {
      removeFile(`${path}${file.filename}`);
      throw new AppError(messages.fileNotCompatible);
    }

    try {
      let pdfBuf = await libre.convertAsync(path + file.filename, to, undefined);
      await fs.writeFile(path + name_doc + to, pdfBuf);
      logger.info(messages.conversionCompleted);
      removeFile(`${path}`+`${file.filename}`);
    } catch (error) {
      logger.error(messages.errorConversion, error); 
      removeFile(`${path}`+`${file.filename}`);
    }
  }
}

export { ConvertDocsUseCase };
