const express = require('express');
require('./db/mongoose');
const userRouter = require('./routes/users')

const app = express();

app.use(express.json());
const port = 4000;

app.use(userRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})