import { Request, Response } from "express";
import JobTitle from "../db/models/JobTitle";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { code, name } = req.body;

        const create = await JobTitle.create({
            code, name
        });

        return res.status(201).send({
            status: 201,
            message: "Created",
            data: create
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            errors: error
        });
    }
}

const GetList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const titles = await JobTitle.findAll();

        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: titles
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            errors: error
        });
    }
};
export default {Create, GetList}