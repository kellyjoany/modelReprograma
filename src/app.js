const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Spotify', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const index = require("./routes/index")
const albumRotas = require("./routes/albumRoutes")
const musicRotas = require("./routes/musicRoutes")


app.use(express.json())

app.use("/", index)
app.use("/album", albumRotas)
app.use("/music", musicRotas)

module.exports = app




