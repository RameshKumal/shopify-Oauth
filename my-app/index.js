const express = require('express');
const app = express();
require('./db/index');
require('dotenv').config();
const port = process.env.port;
const routes = require('./routes/auth');

/*body parser */
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*routes */
app.use('/api/shopify', routes);


app.listen(port, () => {
    console.log(`app listening at port: ${port}`);
})