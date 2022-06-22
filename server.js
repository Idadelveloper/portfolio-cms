const express = require('express');
const articleRouter = require('./routes/articles.js')
const app = express()

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

    res.render('index', { articles: articles })
})

app.listen(5000, () => {
    console.log("Listening for requests in port 5000")
})