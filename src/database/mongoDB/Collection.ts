import * as mongoDB from "mongodb";
import {ICollection} from "./ICollection";
import { ObjectId} from "mongodb";


export class Collection<T extends mongoDB.BSON.Document> implements ICollection<T>{
    private collection: mongoDB.Collection<T>;

    constructor(collection: mongoDB.Collection<T>) {
        this.collection = collection;
    }

    async deleteMany(filter: object ): Promise<void> {
        await this.collection.deleteMany(filter);
    }

    async deleteOne(filter: object): Promise<void> {
        await this.collection.deleteOne(filter);
    }

    async getMany(filter: object){
        return await this.collection.find(filter);
    }

    async getOne(filter: object) {
        return await this.collection.findOne(filter);
    }

    async insertOne(data: T, _id?: ObjectId){
        // @ts-ignore
        return await this.collection.insertOne({_id, ...data}, {forceServerObjectId: !!_id});
    }
    async updateOne(filter: object, update: object){
        // @ts-ignore
        return await this.collection.updateOne(filter, {$set: update});
    }
}