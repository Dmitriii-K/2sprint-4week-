import { ObjectId } from "mongodb";
import { tokenCollection, userCollection } from "../db/mongo-db";
import { RegistrationUser } from "../input-output-types/auth-type";
import { tokenType } from "../input-output-types/eny-type";

export class AuthRepository {
    static async updateCode(userId: string, newCode: string) {
        const result = await userCollection.updateOne({_id : new ObjectId(userId)}, {$set: {'emailConfirmation.confirmationCode': newCode}})
        return result.modifiedCount === 1;
    }
    static async findUserByLogiOrEmail (loginOrEmail: string) {
        return userCollection.findOne({ $or: [{ login: loginOrEmail }, { email: loginOrEmail }] });
    }
    static async createUser (user: RegistrationUser) {
        const saveResult = await userCollection.insertOne(user);
        return saveResult.insertedId.toString();
    }
    static async findUserByCode (code: string) {
        return userCollection.findOne({"emailConfirmation.confirmationCode": code});
    }
    static async findUserByEmail (mail: string) {
        return userCollection.findOne({email: mail});
    }
    static async resendMail (mail: string) {
        return userCollection.findOne({email: mail});
    }
    static async updateConfirmation (_id: ObjectId) {
        const result = await userCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1;
    }
    static async insertTokenFromDB (tokens: tokenType) {
        const saveResult = await tokenCollection.insertOne(tokens);
        return saveResult.insertedId.toString();
    }
}