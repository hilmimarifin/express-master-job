import express from "express";

import JobTitleController from "../controllers/JobTitleController";
import JobPositionController from "../controllers/JobPositionController";

const router = express.Router();

//job title routes
router.post("/job-title", JobTitleController.Create);
router.get("/job-title", JobTitleController.GetList);
router.patch("/job-title/update", JobTitleController.Update);
router.delete("/job-title/delete", JobTitleController.Delete);

//job position routes
router.post("/job-position", JobPositionController.Create);
router.get("/job-position", JobPositionController.GetList);
router.patch("/job-position/update", JobPositionController.Update);
router.delete("/job-position/delete", JobPositionController.Delete);



export default router