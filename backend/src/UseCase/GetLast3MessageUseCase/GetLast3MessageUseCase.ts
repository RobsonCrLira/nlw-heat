import { IMessageRepository } from '../../repositories/IMessageRepository';

class GetLast3MessageUseCase {
    constructor(private messageRepository: IMessageRepository) {}

    async execute() {
        const messages = await this.messageRepository.lastMessages();
        return messages;
    }
}

export { GetLast3MessageUseCase };
