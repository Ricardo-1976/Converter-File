import { Request, Response } from "express";
import { ConvertMusicUseCase } from "./ConvertMusicUseCase";

class ConvertMusicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;
    const to = request.query.to;
    
    const convertMusicUseCase = new ConvertMusicUseCase();

    await convertMusicUseCase.execute({ file, to });
     
    return response.status(201).send();
  }
}

export { ConvertMusicController };


