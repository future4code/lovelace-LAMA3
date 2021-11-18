import { Request, Response } from "express";
import { addShowToADayData } from "../../data/addShowToADayData";
import { generateId } from "../../services/idGenerator";

export const addShowToADayController = async (req: Request, res: Response) => {
    try {
        const showInfo =
        {
            week_day: req.body.week_day,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            band_id: req.body.band_id
        }

        const id = generateId()

        await addShowToADayData(id, showInfo.week_day, showInfo.start_time, showInfo.end_time, showInfo.band_id)

        if (showInfo.start_time < 8 || showInfo.end_time > 23) {
            throw new Error("Invalid Time")
        } else if (showInfo.week_day !== "sexta" && showInfo.week_day !== "sábado" && showInfo.week_day !== "domingo") {
            throw new Error("Invalid day")
        } else {
            res.status(200).send("Show Created")
        }



    } catch (error: any) {
        res.status(500).send({ message: error.message || error.sqlMessage })
    }
}
