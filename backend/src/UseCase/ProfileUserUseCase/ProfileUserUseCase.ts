import { IUserRepository } from '../../repositories/IUserRepository';

class ProfileUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user_id: string) {
        const user = await this.userRepository.findUserById(user_id);

        return user;
    }
}
export { ProfileUserUseCase };
