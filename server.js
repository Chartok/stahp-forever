const express = require( 'express' );
const cors = require( 'cors' );
const routes = require( './routes' );
const { sequelize } = require( './config/config' );

const app = express();
const PORT = process.env.PORT || 3001;

let corsOptions = {
  origin: `http://127.0.0.1`
};

app.use( cors( corsOptions ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.use( routes );

// connect to sequelize, turn on the server
sequelize.sync( { force: false } ).then( () => {
  app.listen( PORT, () => {
    console.log( `App listening on local host port http://localhost:${ PORT }!` );
  } );
} );
