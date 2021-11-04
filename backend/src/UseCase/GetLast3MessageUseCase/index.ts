import { SQLiteMessageRepository } from '../../repositories/implementation/SQLiteMessageRepository';
import { GetLast3MessageController } from './GetLast3MessageController';

const sqliteMessageRepository = new SQLiteMessageRepository();
const getLast3MessageUseCase = new GetLast3MessageController(
    sqliteMessageRepository
);
const getLast3MessageController = new GetLast3MessageController(
    getLast3MessageUseCase
);

export { getLast3MessageController };
