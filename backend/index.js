const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/User.routes");
const scoreRouter = require('./routes/score.routes')
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", userRouter);
app.use('/api/score',scoreRouter)

app.get("/", (req, res) => {
  res.send("✅ Backend running successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
