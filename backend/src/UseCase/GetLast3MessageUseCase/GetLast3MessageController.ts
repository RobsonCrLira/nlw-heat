import { Request, Response } from 'express';
import { GetLast3MessageUseCase } from './GetLast3MessageUseCase';

class GetLast3MessageController {
    constructor(private getLast3Message: GetLast3MessageUseCase) {}

    async handle(request: Request, response: Response) {
        const result = await this.getLast3Message.execute();
        return response.json(result);
    }
}
export { GetLast3MessageController };
