import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { ConverterMusicController } from '@modules/music/useCases/converterMusic/ConverterMusicController';

const musicRoutes = Router();

const uploadMusic = multer(uploadConfig.upload("./tmp/music"));

const converterMusicController = new ConverterMusicController();

musicRoutes.post('/music', uploadMusic.single('music'), converterMusicController.handle);
export { musicRoutes };
