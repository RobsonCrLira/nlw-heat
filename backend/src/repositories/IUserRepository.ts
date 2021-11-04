import { User } from '.prisma/client';
import { IUser } from './IUser';

interface IUserRepository {
    findByGithubId(id: number): Promise<User>;
    verifyByGithubId(id: number): Promise<boolean>;
    save(user: IUser): Promise<User>;
    findUserById(user_id: string): Promise<User>;
}

export { IUserRepository };
