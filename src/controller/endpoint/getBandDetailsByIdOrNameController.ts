import { Request, Response } from "express";
import { getBandDetailsByIdOrNameData } from "../../data/getBandDetailsByIdOrNameData";

export const getBandDetailsByIdOrNameController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.query.name as string;

        const resultWithName = await getBandDetailsByIdOrNameData(name, id)
        const resultWithId = await getBandDetailsByIdOrNameData(id, name)

        const idResponse = res.status(200).send({ resultWithId })
        const nameResponse = res.status(200).send({ resultWithName })

        if (id) {
            return idResponse
        }
        if (name) {
            return nameResponse
        }
    } catch (error: any) {
        res.status(500).send({ message: error.message || error.sqlMessage })
    }
}