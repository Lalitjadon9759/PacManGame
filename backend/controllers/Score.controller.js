
const Score = require("../models/Score.model");


// @desc   Save a new score
// @access Private
exports.submitScore = async (req, res) => {
  try {
    const { score } = req.body;

    if (!score || score < 0)
      return res.status(400).json({ msg: "Invalid score" });

    const newScore = new Score({
      user: req.user.id,
      score,
    });

    await newScore.save();

    res.status(201).json({ msg: "Score submitted successfully", newScore });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc   Get top 10 scores
// @access Public
exports.getTopScores = async (req, res) => {
  try {
    const topScores = await Score.find()
      .populate("user", "username -_id") // show only username
      .sort({ score: -1 })               // highest first
      .limit(10)                         // only top 10
      .select("score user date -_id");   // hide internal _id

    res.json(topScores);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// @desc   Get scores for the logged-in user
// @access Private
exports.getMyScores = async (req, res) => {
  try {
    const myScores = await Score.find({ user: req.user.id }).sort({ date: -1 });
    res.json(myScores);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};


// @desc   Get all scores
// @route  GET /api/scores
// @access Public
exports.getAllScores = async (req, res) => {
  try {
   const allScores = await Score.find()
  .populate("user", "username -_id")
  .sort({ score: -1 })
  .select("score user date -_id")
    res.json(allScores);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};