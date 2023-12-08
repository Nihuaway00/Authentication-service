import {IDatabase} from "../IDatabase";
import type {RedisClientType} from "redis";
import Redis, {Result, Callback, ClientContext} from "ioredis"

export class RedisDB implements IDatabase{
    private readonly _URL: string;
    private readonly _PORT: number;

    static client: Redis | undefined;
    constructor(URL: string, PORT: number) {
        this._URL = URL;
        this._PORT = PORT;
    }

    async connect() {
        if(RedisDB.client){
            return RedisDB.client;
        }

        RedisDB.client = new Redis(this._PORT, this._URL);
        RedisDB.client.on("error", err => {
            console.log("ERROR: redis\nMESSAGE: " + err.message)
            process.exit(1)
        })

        console.log("REDIS: connected");
    }
}