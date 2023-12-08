export interface ICollection<T>{
    getOne(filter: object): Promise<T>;
    getMany(filter: object): Promise<T>;
    deleteOne(filter: object): Promise<void>;
    deleteMany(filter: object): Promise<void>;
}