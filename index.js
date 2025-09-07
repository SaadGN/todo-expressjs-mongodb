// console.log("initial commit")

const express = require("express")
require('dotenv').config();
//const cookieParser = require("cookie-parser")
const {connectToMongoDB} = require("./connect")

const userRoute = require("./routes/user")

const app = express()
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToMongoDB(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))

app.use("/",userRoute);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))