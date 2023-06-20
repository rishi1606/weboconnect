const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors=require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/', routes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
