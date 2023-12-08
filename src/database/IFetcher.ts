import * as mongoDB from "mongodb";

export interface IFetcher<T>{
    getFromID(id: string): Promise<T>;
    deleteFromID(id: string): void;
}