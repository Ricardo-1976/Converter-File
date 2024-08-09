import { Request, Response } from "express";
import { ConvertDocsUseCase } from "./ConvertDocUseCase";

class ConvertDocController {
  async handle(request: Request, response: Response): Promise<Response> {
    const  file = request.file;
    const to = request.query.to;
    
    const convertDocsUseCase = new ConvertDocsUseCase();

    await convertDocsUseCase.execute({ file, to });
     
    return response.status(201).send();
  }
}

export { ConvertDocController };
