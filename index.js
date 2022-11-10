const express = require("express");

// create server express
const app = express();

//route
app.get("/", (req, resp) => {
    resp.json({
        ok: true,
    })
    
  
});

//listen
app.listen(3001, () => {
  console.log(`server corriendo en puerto ${3001}`);
});
