import { io } from '../../app';
import { IMessageRepository } from '../../repositories/IMessageRepository';
import { CreateMessageRequest } from './CreateMessageDTO';

class CreateMessageUseCase {
    constructor(private messageRepository: IMessageRepository) {}

    async execute(data: CreateMessageRequest) {
        const message = await this.messageRepository.create(data);
        const infoWS = {
            text: message.text,
            user_id: message.user_id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url,
            },
        };
        io.emit('new_message', infoWS);
        return message;
    }
}
export { CreateMessageUseCase };
