import { Request, Response } from 'express';
import { AppError } from '../../errors/AppError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

    async handle(request: Request, response: Response) {
        const { code } = request.body;
        try {
            const result = await this.authenticateUserUseCase.execute(
                `${code}`
            );
            return response.json(result);
        } catch (error) {
            return response.json(new AppError(error.message));
        }
    }
}
export { AuthenticateUserController };
