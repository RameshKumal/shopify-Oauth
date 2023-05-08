const express = require('express');
const app = express();
require('./db/index');
require('dotenv').config();
const port = process.env.port;
const routes = require('./routes/auth');
const initRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer')

/*body parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*intitroutes */
initRoutes(app);
customerRoutes(app);


app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
})