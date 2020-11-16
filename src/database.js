const mongoose = require('mongoose');

const URI ="mongodb+srv://ItsonE:entrar1234@clustertest.jx3p9.gcp.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async() => {

    await mongoose.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true});
    console.log('Db Connected');
}

module.exports = connectDB;