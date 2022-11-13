const mongoose = require('mongoose');
const conn_str = "mongodb+srv://Mihir:helloworld@cluster0.pyumo6u.mongodb.net/?retryWrites=true&w=majority";


// DB connection.
mongoose.connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected Successfully..."))
    .catch((error) => console.log(error));

