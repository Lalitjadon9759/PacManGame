const express = require("express");
const auth = require("../middlewares/auth");
const { submitScore, getTopScores, getMyScores, getAllScores } = require("../controllers/Score.controller");
const scoreRouter = express.Router();



scoreRouter.post("/newScore",auth,submitScore)
scoreRouter.get("/allScore",getAllScores)
scoreRouter.get("/top",getTopScores)
scoreRouter.get("/me",auth,getMyScores)





module.exports = scoreRouter