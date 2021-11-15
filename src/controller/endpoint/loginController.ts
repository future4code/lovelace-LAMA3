import { Request, Response } from "express";
import { loginData } from "../../data/loginData";
import { generateToken, getToken } from "../../services/authenticator";
import { compareThePasswordWithTheHash } from "../../services/encrypt";


export async function loginController(req:Request, res :Response):Promise<void> {
  
    try {

        const {email, password} = req.body

        if(!email || !password) {
            res.statusCode = 400
            throw new Error("there can't be empty fields")
        }

        const [user] = await loginData(email)

        const passwordIsCorrect: boolean = await compareThePasswordWithTheHash(password, user.password)

        if(!passwordIsCorrect){
            res.statusCode = 401
            throw new Error("Invalid credentials")
        }

        const token = generateToken({id: user.id, userRoles: user.roles})

        res.send({token})
        
    } catch (error: any) {
        
        if(res.statusCode === 200){

            res.status(500).send("Internal server error")
        }else{

            res.send(error.message)
        }
    }

}