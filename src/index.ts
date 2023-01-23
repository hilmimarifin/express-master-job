import express, { Request, Response } from "express";
import cors from 'cors'
import dotenv from "dotenv";
import sequelizeConnection from "./config/dbConnect";
import router from "./routes/Routes";


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        response: "Express TypeScript"
    });
});


(async () => {
    try {
        await sequelizeConnection.authenticate()
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

app.use(router);


app.listen(process.env.APP_PORT, () => {
    console.log((`${process.env.APP_NAME} running on port ${process.env.APP_PORT}`))
});