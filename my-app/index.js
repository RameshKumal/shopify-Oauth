const express = require('express');
const app = express();
require('./db/index');
require('dotenv').config();
const port = process.env.port;
const routes = require('./routes/auth');
const initRoutes = require('./routes/auth');

/*body parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*intitroutes */
initRoutes(app);


app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
})