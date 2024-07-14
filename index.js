const path = require("path");
const express = require("express");
const mogoose = require('mongoose');

const userRouter = require('./routes/user')

const app = express();

const PORT = 8000;

mogoose.connect('mongodb://127.0.0.1:27017/blogify').then((e) => {
    console.log("MongoDB Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    return res.render('home');
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));