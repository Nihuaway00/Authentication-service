import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { createRoutes } from './routes';
import {MongoDB} from "./database/mongoDB/MongoDB";
import {RedisDB} from "./database/redis/RedisDB";

dotenv.config();

const app: Express = express();
const router: Router = express.Router()
const port: string = process.env.PORT || '8000';


createRoutes(router)


app.get('/', (req: Request, res: Response) => {
	res.send('Server has been working...');
});

async function initMongoDB(){
	const DB_CONN_STRING = process.env.MONGO_URL;
	const DB_NAME = process.env.MONGO_NAME;

	if(!DB_CONN_STRING || !DB_NAME){
		console.log("Error with MongoDB connection");
		return;
	}

	const DB = new MongoDB(DB_CONN_STRING, DB_NAME);
	await DB.connect()
}

async function initRedis(){
	const URL = process.env.REDIS_URL;
	const PORT = process.env.REDIS_PORT;

	if(!URL || !PORT){
		console.log("Error with Redis DB connection");
		return;
	}

	const DB = new RedisDB(URL, parseInt(PORT));
	await DB.connect();
}

app.listen(port, async () => {
	await initMongoDB();
	await initRedis();
	console.log(`[server]: Server is running at http://localhost:${port}`);
});