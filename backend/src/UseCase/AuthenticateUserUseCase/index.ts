import { SQLiteUserRepository } from '../../repositories/implementation/SQLiteUserRepository';
import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

const sqliteUserRepository = new SQLiteUserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(
    sqliteUserRepository
);
const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase
);
export { authenticateUserController };
