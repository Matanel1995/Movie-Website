const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");

dotenv.config();

//Connect to DB at first

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

//allow json format
app.use(express.json());
app.use(cors({
  origin: 'https://movie-back-oghj.onrender.com:8080/'
}));


app.use("/api/auth", authRoute);
app.use("/api/movies", movieRoute);

app.listen(8080, ()=>{
    console.log("Backend server is running on port 8080");
})