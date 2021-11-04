import { Message } from '.prisma/client';
import prismaClient from '../../prisma';
import { IMessage } from '../IMessage';
import { IMessageRepository } from '../IMessageRepository';

class SQLiteMessageRepository implements IMessageRepository {
    async create(data: IMessage) {
        const message = await prismaClient.message.create({
            data: {
                text: data.message,
                user_id: data.user_id,
            },
            include: {
                user: true,
            },
        });

        return message;
    }

    async lastMessages() {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: 'desc',
            },
            include: {
                user: true,
            },
        });
        return messages;
    }
}

export { SQLiteMessageRepository };
