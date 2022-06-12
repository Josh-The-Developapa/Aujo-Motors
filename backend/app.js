const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./src/middleware/errorHandler.js');
const routes = require('./src/routes/routes.js');
const mongoose = require('mongoose');
const mongoSnaitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')

const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(fileUpload())
app.use(routes);
app.use(errorHandler);
app.use(helmet());
app.use(mongoSnaitize());
app.use(xss());



const PORT = process.env.PORT
const dbURL = process.env.DBURL;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.log(error));

app.listen(PORT);
console.log('Server running on port ' + PORT);
