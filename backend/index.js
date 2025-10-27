const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/User.routes");
const scoreRouter = require("./routes/score.routes");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/users",userRouter);
app.use("/score",scoreRouter)


app.get("/",(req,res)=>{
    res.send("page is working")
})

app.use((req,res)=>{
    res.status(404).json({msg:"Page not found"})
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
