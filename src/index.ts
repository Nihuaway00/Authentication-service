import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { createRoutes } from './routes';

dotenv.config();

const app: Express = express();
const router: Router = express.Router()
const port = process.env.PORT;


createRoutes(router)


app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server @@@@@@@@@@@@@');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});