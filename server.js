const express = require("express");
const app = express();

const bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var cors = require('cors')
var path = require('path')

var UserRoutes = require('./backend/Routes/UserRoutes')
var ProductRoutes = require('./backend/Routes/ProductRoutes')
var OrderRoutes = require('./backend/Routes/OrderRoutes')
const config = require("./backend/config/key");
const PORT = process.env.PORT || 4000

var cors = require('cors');
var originsWhitelist = [
'http://localhost:4402','http://localhost:4401','https://ecommerce-front.herokuapp.com'
];
var corsOptions = {
origin: function(origin, callback){
var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
callback(null, isWhitelisted);
},
credentials:true
}
app.use(cors(corsOptions));



mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

  next();
});

// app.use(cors({
//     origin: [
//         "http://localhost:4200"
//     ], credentials: true
// }));



app.use('/api/user', UserRoutes)
app.use('/api', ProductRoutes)
app.use('/api/orders', OrderRoutes)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist/ecommerce')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ecommerce', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`))