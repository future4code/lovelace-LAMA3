import { Request, Response } from "express";
import { signUpData } from "../../data/signUpData";
import { generateToken } from "../../services/authenticator";
import { generateHash } from "../../services/encrypt";
import { generateId } from "../../services/idGenerator";
import { roles } from "../../types/authentiationData";

export const signUpController = async (req: Request, res: Response) => {
    try {
        const newUserInfo = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role as roles
        }

        const id = generateId()

        const token = generateToken(
            {
                id,
                userRoles: newUserInfo.role
            })


        const encryptedPassword = await generateHash(newUserInfo.password)

        await signUpData(id, newUserInfo.name, newUserInfo
            .email, encryptedPassword, newUserInfo.role)


        if (!newUserInfo.name || !newUserInfo.email || !newUserInfo.password || !newUserInfo.role) {
            res.statusCode = 404
            throw new Error("Invalid Body")

        } else if (newUserInfo.name.length < 5 || newUserInfo.email.indexOf("@") === -1 || newUserInfo.password < 5) {
            res.statusCode = 400
            throw new Error("One of the requireds fields are invalid")
        } else {
            res.status(200).send({ token })
        }


    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}