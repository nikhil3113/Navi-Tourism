const express = require('express');
const dotenv = require('dotenv');
const route = require('./src/routes/route')
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./src/passport')

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());


app.use('/', route)

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})