import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { createRoutes } from './routes';
import {MongoDB} from "./database/mongoDB/MongoDB";
import {RedisDB} from "./database/redis/RedisDB";
import cors from "cors";
import cookieParser from "cookie-parser"
import {TransportCreator} from "./Services/EmailService/TransportCreator";

dotenv.config();

const corsConfig = {
	origin: "*",
	credentials: true,
}

const app: Express = express();
const router: Router = express.Router()
const port: string = process.env.PORT || '8000';

app.disable("x-powered-by")
app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser("fff"))
app.use(router)

createRoutes(router);

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

function createMailTransport(){
	const host = process.env.EMAIL_HOST
	const port = process.env.EMAIL_PORT
	const user = process.env.EMAIL_AUTH_USER
	const pass = process.env.EMAIL_AUTH_PASS

	if(!host || !port || !user || !pass){
		console.log("Error with create a mail transport")
		return;
	}

	const transporter = new TransportCreator(host, port, user, pass);
	transporter.createTransport();
	transporter.verify();
}

app.listen(port, async () => {
	await initMongoDB();
	await initRedis();
	createMailTransport();
	console.log(`[server]: Server is running at http://localhost:${port}`);
});