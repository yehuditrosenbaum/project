const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();
const bodyParser = require('body-parser')
const router = require('./routes/api')
const cors = require('cors');
app.use(cors())
app.all('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Headers', "*")
    res.header('Access-Control-Allow-Methods', "*")

    next();
})
const decodeIDToken = require("./firebase/authenticateToken");
// app.use("/", decodeIDToken);


const connectionParams = {
    newUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(process.env.DB_CONNECT, connectionParams)
    .then(() => {
        console.log("connected!")
    })
    .catch((err) => {
        console.log(`error connecting ${err}`)
    })
app.use(bodyParser.json());
app.use('/', router);

app.listen(process.env.PORT, () => console.log('listen 4000'));

