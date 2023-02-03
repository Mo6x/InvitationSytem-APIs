import express, {  
    Request, 
    Response, 
    NextFunction,
    Application, 
    ErrorRequestHandler, 
 } from "express";

  import { Server } from "http";
  import createHttpError from "http-errors";
  import { config } from "dotenv";
  import cors from 'cors';
  import routes from './routes';
  //import mongoose from 'mongoose';


  config()
  const app: Application  = express()

//   const uri = process.env.MONGO_URI || 'mongodb://localhost/myapp';
//   mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   });
  
//   const connection = mongoose.connection;
//   connection.once('open', () => {
//     console.log('MongoDB database connection established successfully');
//   });

 app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello from ts app");
  });

  app.use("/", (req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
  });

  const errorHandler: ErrorRequestHandler = (err, req, res, next)  => { 
    res.status(err.status || 500)
    res.send({ status: err.status || 500,
    message: err.message
    })  
   }
  
  app.use(cors());
  app.use('/', routes);
  app.use(errorHandler);

const PORT:  Number = Number(process.env.PORT) || 4000;
const server: Server = app.listen(4000, ()=> 
console.log(`Runing on ${PORT}`));

