const express = require('express');
const  bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const port = 3000;


//import routes
const _deal = require('./routes/deal.js');

//load endpoints
app.use('/', _deal);

app.get('/', (req, res) => {
  res.send('Card Game Backend End Server!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});