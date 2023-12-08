import {ObjectId} from "mongodb";

export default class PasswordModel{
    constructor(userID: ObjectId, hashedValue: string) {}
}