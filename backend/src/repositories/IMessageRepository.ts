/* eslint-disable no-unused-vars */
import { Message } from '.prisma/client';
import { IMessage } from './IMessage';

interface IMessageRepository {
    create(data: IMessage);
    lastMessages();
}
export { IMessageRepository };
