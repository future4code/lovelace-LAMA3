import { Request, Response } from "express";
import { getShowsData } from "../../data/getShowsData";

export const getShowsController = async (req: Request, res: Response) => {
    try {

        const week_day = req.params.week_day;

        const result = await getShowsData(week_day)

        if (!week_day) {
            throw new Error("Invalid day")

        } else if (week_day !== "sexta" && week_day !== "sábado" && week_day !== "domingo") {
            throw new Error("Invalid day ")

        } else {
            res.status(200).send({ result })
        }

    } catch (error: any) {
        res.status(500).send({ message: error.message || error.sqlMessage })
    }
}