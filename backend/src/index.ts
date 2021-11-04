import 'dotenv/config';
import { serverHttp } from './app';

const port = process.env.PORT || 4000;
serverHttp.listen(port, async () => {
    console.log(`🚀 Server is running => http://localhost:${port}`);
});
