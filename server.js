const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// import sequelize connection
const { Sequelize } = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3001;

let corsOptions = {
  origin: 'http://localhost 3001'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server

app.listen(PORT, () => {
  console.log(`App listening on local host port http://localhost:${PORT}!`);
});
