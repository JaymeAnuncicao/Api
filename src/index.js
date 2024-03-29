const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./Controllers/Auth')(app);
require('./Controllers/take')(app);

app.listen(5000);
