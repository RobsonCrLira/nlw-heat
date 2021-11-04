import { Router } from 'express';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { authenticateUserController } from './UseCase/AuthenticateUserUseCase';
import { createMessageController } from './UseCase/CreateMessageUseCase';
import { getLast3MessageController } from './UseCase/GetLast3MessageUseCase';
import { profileUserController } from './UseCase/ProfileUserUseCase';

const routes = Router();

routes.get('/github', (request, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

routes.get('/signin/callback', (request, response) => {
    const { code } = request.query;

    return response.json(code);
});

routes.post('/authenticate', (request, response) => {
    authenticateUserController.handle(request, response);
});

routes.post('/messages', ensureAuthenticated, (request, response) => {
    createMessageController.handle(request, response);
});
routes.get('/messages/last3', (request, response) => {
    getLast3MessageController.handle(request, response);
});

routes.post('/profile', ensureAuthenticated, (request, response) => {
    profileUserController.handle(request, response);
});

export { routes };
