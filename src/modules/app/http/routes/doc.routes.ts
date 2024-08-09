import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload'
import { ConvertDocController } from '@modules/app/useCases/convertDoc/ConvertDocController';

const docRoutes = Router();

const uploadDoc = multer(uploadConfig.upload("./tmp/doc"));

const convertDocController = new ConvertDocController();

docRoutes.post('/doc', uploadDoc.single('doc'), convertDocController.handle);

export { docRoutes };
