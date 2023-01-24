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

const Update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { code, name, id } = req.body;

        const title = await JobTitle.findByPk(id);

        if (!title) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }

        title.name = name;
        title.code = code;

        await title.save();

        return res.status(200).send({
            status: 200,
            message: "OK",
            data: title
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

const Delete = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.body;

        const role = await JobTitle.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }

        await role.destroy();

        return res.status(200).send({
            status: 200,
            message: "Deleted",
            data: null
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
export default {Create, GetList, Update, Delete}