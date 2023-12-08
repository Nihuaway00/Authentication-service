import {FindCursor, WithId} from "mongodb";

export interface ICollection<T>{
    getOne(filter: object): Promise<WithId<T> | null>;
    getMany(filter: object): Promise<FindCursor<WithId<T>>>;
    deleteOne(filter: object): Promise<void>;
    deleteMany(filter: object): Promise<void>;
}