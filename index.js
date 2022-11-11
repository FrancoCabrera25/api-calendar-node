const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// create server express
const app = express();

//db connect
dbConnection();

//cors 
app.use(cors());

//public
app.use(express.static('public'));

//body parse
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

//listen
app.listen(process.env.PORT, () => {
    console.log(`server corriendo en puerto ${3001}`);
});
