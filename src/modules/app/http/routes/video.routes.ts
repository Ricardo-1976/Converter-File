import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { ConvertVideoController } from '@modules/app/useCases/convertVideo/ConvertVideoController';

const videoRoutes = Router();

const uploadVideo = multer(uploadConfig.upload("./tmp/video"));

const convertVideoController = new ConvertVideoController();

videoRoutes.post('/video', uploadVideo.single('video'), convertVideoController.handle);
export { videoRoutes };