const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

const app = express()

// setup express
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
// setup body-parser
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }));
app.use(bodyParser.json());

// mongoose connection
const mongoose = require('mongoose')
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/ACMEdb'
mongoose.connect(uristring, {   
    useNewUrlParser: true,
    useUnifiedTopology: true},
    function (err, res) {
        if (err) {console.log ('ERROR connecting to: ' + uristring + '. ' + err) } 
        else { console.log ('Succeeded connected to: ' + uristring) }
    }
)

// routes
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

// Listen PORT
app.listen(process.env.PORT || 3000)