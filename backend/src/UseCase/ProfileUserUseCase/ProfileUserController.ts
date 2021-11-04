import { Request, Response } from 'express';
import { ProfileUserUseCase } from './ProfileUserUseCase';

class ProfileUserController {
    constructor(private profileUserUseCase: ProfileUserUseCase);

    async handle(request: Request, response: Response) {
        const { user_id } = request;
        const result = await this.profileUserUseCase.execute(user_id);
        return response.json(result);
    }
}
export { ProfileUserController };
