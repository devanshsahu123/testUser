const express = require('express')
const app = express();
const connectDB = require('./config/db.js')

require('dotenv').config()
connectDB();

//allow ejs view engine;
app.set('view engine', 'ejs');

//allow body;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//user router;
app.use('/user', require('./router/userRoutes.js'))


app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})
