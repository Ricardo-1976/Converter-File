import { Request, Response } from "express";
import { ConverterMusicUseCase } from "./ConverterMusicUseCase";
import logger from "@config/logger";

class ConverterMusicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;
    const to = request.query.to;
    
    const converterMusicUseCase = new ConverterMusicUseCase();

    await converterMusicUseCase.execute({ file, to });
     
    return response.status(201).send();
  }
}

export { ConverterMusicController };


