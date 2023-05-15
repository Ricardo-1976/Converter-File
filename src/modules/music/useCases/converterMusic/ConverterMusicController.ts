import { Request, Response } from "express";
import { ConverterMusicUseCase } from "./ConverterMusicUseCase";

class ConverterMusicController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;

    const converterMusicUseCase = new ConverterMusicUseCase();

     await converterMusicUseCase.execute(file);

    return response.status(201).send();
  }
}

export { ConverterMusicController };


