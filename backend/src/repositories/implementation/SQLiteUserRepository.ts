import { User } from '.prisma/client';
import { AppError } from '../../errors/AppError';
import prismaClient from '../../prisma';
import { IUser } from '../IUser';
import { IUserRepository } from '../IUserRepository';

class SQLiteUserRepository implements IUserRepository {
    async findUserById(user_id: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id,
            },
        });

        if (!user) throw new AppError('User not exits');

        return user;
    }

    async findByGithubId(id: number): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                github_id: id,
            },
        });

        if (!user) throw new AppError('Error');

        return user;
    }

    async verifyByGithubId(id: number): Promise<boolean> {
        const user = await prismaClient.user.findFirst({
            where: {
                github_id: id,
            },
        });

        if (!user) return false;

        return true;
    }

    async save(data: IUser): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                github_id: data.github_id,
                login: data.login,
                avatar_url: data.avatar_url,
                name: data.name,
            },
        });
        return user;
    }
}

export { SQLiteUserRepository };
