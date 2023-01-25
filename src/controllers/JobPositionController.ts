import { Request, Response } from "express";
import JobPosition from "../db/models/JobPosition";
import JobTitle from "../db/models/JobTitle";

const Create = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { code, name, titleId } = req.body;

        const create = await JobPosition.create({
            code, name, titleId
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
        const positions = await JobPosition.findAll({
            include: {
                model: JobTitle,
                attributes: ["name"],
                foreignKey: "titleId"
            }
        });

        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: positions
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
        const { code, name, id, titleId } = req.body;

        const position = await JobPosition.findByPk(id);

        if (!position) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }

        position.name = name;
        position.code = code;
        position.titleId = titleId;

        await position.save();

        return res.status(200).send({
            status: 200,
            message: "OK",
            data: position
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

        const position = await JobPosition.findByPk(id);

        if (!position) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null
            });
        }

        await position.destroy();

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