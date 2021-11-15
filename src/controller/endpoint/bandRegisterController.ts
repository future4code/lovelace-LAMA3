import { bandRegisterData } from "../../data/bandRegisterData";
import { Request, Response } from "express";
import { generateId } from "../../services/idGenerator";
import { getToken } from "../../services/authenticator";
import {roles } from "../../types/authentiationData";

export const bandRegisterController = async (req: Request, res: Response) => {
    try {

        const Authorization = req.headers.Authorization as string;


        const theToken = getToken(Authorization)

        const user = theToken?.userRoles

        const bandInfo =
        {
            name: req.body.name,
            music_genre: req.body.music_genre,
            responsible: req.body.responsible
        }

        const id = generateId();


        if (user === roles.NORMAL) {
            res.statusCode = 401
            throw new Error("Invalid User")
        } else if (!bandInfo.music_genre || !bandInfo.name || !bandInfo.responsible) {
            res.statusCode = 404
            throw new Error("Invalid Body")
        } else {
            await bandRegisterData(
                id,
                bandInfo.name,
                bandInfo.music_genre,
                bandInfo.responsible
            )
            res.status(200).send("Band Succsesfully registered")

        }

    } catch (error: any) {
        res.status(500).send({ message: error.message || error.sqlMessage })
    }
}