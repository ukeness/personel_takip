import { UserModel } from "../../models/UserModel";
import { IUserRepository } from "../../../../application/repositories/IUserRepository";
import { Users } from "../../../../domain/entities/Users";

export class UserRepository implements IUserRepository<Users>{

    async update(user_id: string, data: Partial<Users>): Promise<void>{
        try {

            const response =  await UserModel.update(data, {
                where: {
                    id: { user_id }
                }
            })
            if(Number(response) == 0) throw new Error("The user to be updated was not found.")
        }
        catch(error: any){
            throw new error("Somethings gone wrong please wait...")
        }
    }

}