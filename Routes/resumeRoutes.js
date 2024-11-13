const express = require("express");
const router = express.Router();
const resumeController = require("./../Controller/resumeController");

router.route("/").post(resumeController.createResume).get(resumeController.getAllResume);
router
  .route("/:id")
  .get(resumeController.checkResume)
  .delete(resumeController.deleteResume)
  .put(resumeController.editResume);


module.exports=router;