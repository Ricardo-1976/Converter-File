import { Request, Response } from "express";
import { ConvertVideoUseCase } from "./ConvertVideoUseCase";

class ConvertVideoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;
    const to = request.query.to;
    
    const convertVideoUseCase = new ConvertVideoUseCase();

    await convertVideoUseCase.execute({ file, to });
     
    return response.status(201).send();
  }
}

export { ConvertVideoController };


