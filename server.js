const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles.js')
const dotenv = require("dotenv")

const app = express()
dotenv.config()

// connect to mongodb
const MONGODB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@portfoliodb.n5g0z.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use('/articles', articleRouter)


app.get('/', (req, res) => {
    const articles = [{
            title: 'Test article',
            createdAt: new Date(),
            description: 'Test description'
        },
        {
            title: 'Test article 2',
            createdAt: new Date(),
            description: 'Test description 2'
        },

    ]

    res.render('articles/index', { articles: articles })
})

app.listen(5000, () => {
    console.log("Listening for requests in port 5000")
})