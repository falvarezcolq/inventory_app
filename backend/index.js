const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(cors())

// Parseando a json
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({ extended: true ,limit: "50mb"}));

// Manejo de errores
// app.use((err, req, res, next) => {
//   console.log(err.stack);
//   res.status(500).send('Error middleware');
// });



app.use( express.static('public'));
app.use('/images', express.static('images'));

// Configuracion global de rutas
app.use(require("./routes/index.route"));
// Puerto
const puerto = process.env.APP_PORT || 3001;

app.use(express.json({limit: '50mb'}));

app.listen( puerto, () => {
  console.log( `Servidor corriendo en puerto: ${puerto}` );
});

module.exports = app;