import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { ConvertMusicController } from '@modules/app/useCases/convertMusic/ConvertMusicController';

const musicRoutes = Router();

const uploadMusic = multer(uploadConfig.upload("./tmp/music"));

const convertMusicController = new ConvertMusicController();

musicRoutes.post('/music', uploadMusic.single('music'), convertMusicController.handle);
export { musicRoutes };
