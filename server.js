const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles.js')
const dotenv = require("dotenv")
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express()
dotenv.config()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

// connect to mongodb
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@portfoliodb.n5g0z.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!');

})


app.get('/', async(req, res) => {

    const articles = await Article.find().sort({ date: 'desc' })

    res.render('articles/index', { articles: articles })
})

app.listen(5000, () => {
    console.log("Listening for requests in port 5000")
})