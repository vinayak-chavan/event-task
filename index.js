require('./db/connection');
const express = require('express');
const routes = require('./routes/event');

const port = 5000;

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/api/v3/app', routes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
})