const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://haechang:khc9215@test.yfm5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=> console.log('mongoDB Connected'))
.catch(err => console.log(err))
app.get('/',(req,res) => res.send('hello world'))

app.listen(port, ()=> console.log(`example app listening on port ${port}!`))