import { Request, Response } from "express";
import { CreateUser } from "../../../application/use_cases/user-use-case/CreateUser";
import { DeleteUser } from "../../../application/use_cases/user-use-case/DeleteUser";
import { GetUser } from "../../../application/use_cases/user-use-case/GetUser";
import { UpdateUser } from "../../../application/use_cases/user-use-case/UpdateUser";
import { LoginUser } from "../../../application/use_cases/user-use-case/LoginUser";

export class UserController{
    constructor(
        private CreateUser: CreateUser,
        private DeleteUser: DeleteUser,
        private GetUser: GetUser,
        private UpdateUser: UpdateUser,
    ){}

    async createUser(req: Request, res: Response): Promise<void>{
        try{
            const {username, password} = req.body;
            const response = await this.CreateUser.execute({username, password})
            res.status(201).json({
                success: response.success,
                message: response.message
            })
        }catch(error: any){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }

    }
    async deleteUser(req: Request, res:Response){
        try{
            const {id} = req.params;
            const response = await this.DeleteUser.execute({id})
            res.status(201).json({
                success: response.success,
                message: response.message,
                
            })
        }catch(error: any){
            res.status(400).json({
                success: true,
                message: error.message
            })
        }

    }
    async getUser(req: Request, res: Response){
        try{
            const {id} = req.params;
            const response = await this.GetUser.execute({id})
            res.status(201).json({
                success: true,
                message: "Kullanıcılar getirildi",
                data: response,
            })
        }catch(error: any){
            res.status(201).json({
                success: false,
                message: error.message,
            })           
        }

    }
    async updateUser(req: Request, res: Response){
        try{
            const {id,username,password} = req.body;
            const response = await this.UpdateUser.execute({id,username,password})
            res.status(201).json({
                success: response.success,
                message: response.message,
                username: response.username,
                password: response.password,
            })
        }catch(error: any){
            res.status(400).json({
                success: false,
                message: error.message,

            })            
        }
    }
}










