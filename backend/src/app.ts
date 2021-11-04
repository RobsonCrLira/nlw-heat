import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { AppError } from './errors/AppError';
import { routes } from './routes';

const app = express();
app.use(cors());
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log(`Usuario conectado no socket ${socket.id}`);
});

app.use(express.json());

app.use('/api', routes);

app.use(
    // eslint-disable-next-line no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        return response.status(500).json({
            status: 'error',
            message: `Internal Server Error : ${err.message}`,
        });
    }
);
export { serverHttp, io };
