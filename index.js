const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/utils/mongodb');
dotenv.config();

const workoutsRouter = require('./src/api/routes/workouts.route');
const usersRouter = require('./src/api/routes/users.route')
//---------------------------------INPUT---------------------------------

// Create Server
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

//---------------------------------MIDDLEWARE---------------------------------
app.use((req,res,next)=>{
    console.log(`New petition: ${req.method} ${req.url}`)
    next();//Next es para seguir el hilo aunque la peticion no contenga respuesta
});

//ROUTES
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use('/movies', routerMovies);
app.use('/workouts', workoutsRouter);
app.use('/users', usersRouter);


//ERRORS
app.use((error, req, res) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

// Connect Server
app.listen(PORT, () => console.log('Listening in port: ', PORT));
