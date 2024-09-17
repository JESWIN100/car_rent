import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import logger from 'morgan'
import apiRouter from './routes/index.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser())
const port = process.env.PORT

// Connect to the database
connectDB();

app.use(cors({
    origin: "*", 
    credentials: true, 
   
  }));
  
//https://car-rental-app-frontent-jeswins-projects-f40474fd.vercel.app
app.use(bodyParser.json()); // Parse JSON bodies


app.use(logger('dev'));
// Default route

app.get("/",(req,res)=>{
    res.send("Welcome to the API")
})
// API routes
app.use('/api', apiRouter);


// 404 handler for undefined routes
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint does not exist' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
