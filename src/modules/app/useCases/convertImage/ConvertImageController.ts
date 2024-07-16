import { Request, Response } from "express";
import { ConvertImageUseCase } from "./ConvertImageUseCase";

class ConvertImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;
    const to = request.query.to;
    
    const convertImageUseCase = new ConvertImageUseCase();

    await convertImageUseCase.execute({ file, to });
     
    return response.status(201).send();
  }
}

export { ConvertImageController };


