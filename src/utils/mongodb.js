const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Iniciar dotenv
dotenv.config();
//---------------------------------INPUT---------------------------------
//Para evitar aviso
mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        const DB = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //INFO
        const {name, host} = DB.connection;
        console.log(`Connected to DB "${name}" in host "${host}"`);
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
    }
}

//---------------------------------OUTPUT---------------------------------
module.exports = connect;
