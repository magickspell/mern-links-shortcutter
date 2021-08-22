const express = require('express') //express enabled?
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
//result of function express
const app = express()
//use middleware fore json parsing in console
app.use(express.json({extended: true}))
//creating endpoint for authorization links and etc
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))
//if wa are running production, then give static js from dir
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
// getting port number from json config file
const PORT = config.get('port') || 5000
// connecting mongoDB
// start is async cause we are waiting response from mongoDB
async function start() {
    try {
        await mongoose.connect(config.get('mongoUri', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }))
        app.listen(PORT, () => console.log(`app started on port ${PORT}`))
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}

start()



