import {ObjectId} from "mongodb";

export default class PasswordModel{
    constructor(_id: ObjectId, userID: ObjectId, hashedValue: string) {}
}