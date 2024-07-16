import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { ConvertImageController } from '@modules/app/useCases/convertImage/ConvertImageController';

const imageRoutes = Router();

const uploadImage = multer(uploadConfig.upload("./tmp/image"));

const convertImageController = new ConvertImageController();

imageRoutes.post('/image', uploadImage.single('image'), convertImageController.handle);
export { imageRoutes };
