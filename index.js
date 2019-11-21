const express = require('express');
const app = express();
const routes = require('./routes.js');

app.use(routes);

app.use(express.static('public'));

app.listen(process.env.PORT||5000, function () {
    console.log("app starts at port 5000");
});