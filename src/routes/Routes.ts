import express from "express";

import JobTitleController from "../controllers/JobTitleController";

const router = express.Router();

//job title routes
router.post("/job-title", JobTitleController.Create);
router.get("/job-title", JobTitleController.GetList);

export default router