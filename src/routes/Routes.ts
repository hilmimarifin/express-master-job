import express from "express";

import JobTitleController from "../controllers/JobTitleController";

const router = express.Router();

//job title routes
router.post("/job-title", JobTitleController.Create);
router.get("/job-title", JobTitleController.GetList);
router.patch("/job-title/update", JobTitleController.Update);
router.delete("/job-title/delete", JobTitleController.Delete);



export default router