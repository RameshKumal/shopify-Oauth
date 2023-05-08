const express = require('express');
const app = express();
require('./db/index');
require('dotenv').config();
const port = process.env.port;

const initRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/product');

/*body parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*intitroutes */
initRoutes(app);
customerRoutes(app);
productRoutes(app);


app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
})