import { SQLiteUserRepository } from '../../repositories/implementation/SQLiteUserRepository';
import { ProfileUserController } from './ProfileUserController';
import { ProfileUserUseCase } from './ProfileUserUseCase';

const sqliteUserRepository = new SQLiteUserRepository();
const profileUserUseCase = new ProfileUserUseCase(sqliteUserRepository);
const profileUserController = new ProfileUserController(profileUserUseCase);
export { profileUserController };
