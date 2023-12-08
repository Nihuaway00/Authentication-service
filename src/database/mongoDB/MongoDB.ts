import * as mongoDB from "mongodb";
import {collections} from "../collections";
import {IUser} from "../../interfaces/IUser";
import {IDatabase} from "../IDatabase";

export class MongoDB implements IDatabase{
    private readonly _DB_CONN_STRING: string;
    private readonly _DB_NAME: string;

    private static db: mongoDB.Db | undefined;
    private static client: mongoDB.MongoClient | undefined;

    constructor(DB_CONN_STRING: string, DB_NAME: string) {
        this._DB_CONN_STRING = DB_CONN_STRING;
        this._DB_NAME = DB_NAME;
    }

    async connect(){
        if(MongoDB.client){
            return MongoDB.client;
        }

        MongoDB.client = new mongoDB.MongoClient(this._DB_CONN_STRING);
        await MongoDB.client.connect();
        MongoDB.db = MongoDB.client.db(this._DB_NAME);
        collections.users = MongoDB.db.collection<IUser>('users');

        console.log(`MONGODB: connected - ${this._DB_NAME}`);
    }

    static getCollection<T extends mongoDB.BSON.Document>(name: string) {
        if(!MongoDB.db) throw new Error("Database hadn`t connected");
        return MongoDB.db.collection<T>(name);
    }

}