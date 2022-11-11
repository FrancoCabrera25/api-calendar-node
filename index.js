const express = require("express");
require("dotenv").config();

// create server express
const app = express();

//public
app.use(express.static("public"));

//body parse
app.use(express.json());

//routes
app.use('/api/auth', require('./routes/auth'));

//listen
app.listen(process.env.PORT, () => {
  console.log(`server corriendo en puerto ${3001}`);
});
