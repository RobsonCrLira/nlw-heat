import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { CreateMessageUseCase } from './CreateMessageUseCase';

class CreateMessageController {
    constructor(private createMessageUseCase: CreateMessageUseCase) {}

    async handle(request: Request, response: Response) {
        const { message } = request.body;
        const { user_id } = request;
        try {
            const result = await this.createMessageUseCase.execute({
                message,
                user_id,
            });
            return response.json(result);
        } catch (error) {
            return new AppError(error.message);
        }
    }
}

export { CreateMessageController };
