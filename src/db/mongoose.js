const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://infirobo:infirobo@123@cluster0-npvfg.mongodb.net/demo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})