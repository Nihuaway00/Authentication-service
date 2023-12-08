import * as mongoDB from "mongodb";
import {ICollection} from "./ICollection";
import {WithId} from "mongodb";


export class Collection<T extends mongoDB.BSON.Document> implements ICollection<T>{
    private collection: mongoDB.Collection<T>;

    constructor(collection: mongoDB.Collection<T>) {
        this.collection = collection;
    }

    async deleteMany(filter: object ): Promise<void> {
    }

    async deleteOne(filter: object): Promise<void> {
    }

    async getMany(filter: object){
        return await this.collection.find(filter);
    }

    async getOne(filter: object) {
        return await this.collection.findOne(filter);
    }

}