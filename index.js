require("dotenv").config();
const express = require("express");
const app = express()
const { sequelize, Op, Sequelize } = require("./config/sequelize");
sequelize
    .authenticate()
    .then(() => console.log("Connect database success!"))
    .then(listen)
    .then(function() {
        const model = require('./config/model')({ sequelize, Sequelize });
        require('./config/express')({ app, express });
        require('./config/route')({ app, model, Op })
        require('./cron/')({ model, Op });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

function listen() {
    let { PORT = 80 } = process.env;
    app.listen(PORT, () => console.log('Express listen in port', PORT));
}
