import * as mongoDB from "mongodb";
import {ICollection} from "./ICollection";


export class Collection<T extends mongoDB.BSON.Document> implements ICollection<T>{
    private collection: mongoDB.Collection<T>;

    constructor(collection: mongoDB.Collection<T>) {
        this.collection = collection;
    }

    async deleteMany(filter: object ): Promise<void> {
    }

    async deleteOne(filter: object): Promise<void> {
    }

    async getMany(filter: object): Promise<T> {
        // @ts-ignore
        return undefined
    }

    async getOne(filter: object): Promise<T> {
        // @ts-ignore
        return undefined;
    }

}