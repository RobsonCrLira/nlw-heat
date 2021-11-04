import { SQLiteMessageRepository } from '../../repositories/implementation/SQLiteMessageRepository';
import { CreateMessageController } from './CreateMessageController';
import { CreateMessageUseCase } from './CreateMessageUseCase';

const sqliteMessageRepository = new SQLiteMessageRepository();
const createMessageUseCase = new CreateMessageUseCase(sqliteMessageRepository);
const createMessageController = new CreateMessageController(
    createMessageUseCase
);

export { createMessageController };
