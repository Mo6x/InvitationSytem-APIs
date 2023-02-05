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
  import adminRoutes from './routes/index';
  import { pool } from './db';


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


  app.use('/admin', adminRoutes);

  app.post("/group", (req: Request, res: Response, next: NextFunction) => {
    res.send("Create a new group Sucessfully");
  });

  app.post("/group/:groupId/members", (req: Request, res: Response, next: NextFunction) => {
    res.send("Add members to a group Sucessfully");
  });

  app.patch("/group/:groupId/members/:memberId", (req: Request, res: Response, next: NextFunction) => {
    res.send("Accept or reject a group invitation");
  });

  //PI routes for retrieving information 
  //about groups and their members.
  app.get('/groups', async (req, res) => {
    res.send(" Retrieve information about all groups");
  });
  
  app.get('/group/:groupId', async (req, res) => {
    res.send("Retrieve information about a specific group") ;
  });
  
  app.get('/group/:groupId/members', async (req, res) => {
    res.send("Retrieve information about all members in a specific group");
  });

  //members to update their own information, 
 //such as their name or email address.
  app.put('/member', async (req, res) => {
    res.send("Update a member's information");
  }); 


  // ACCEPT INVITATION
  app.post('/group/invitation/accept', async (req, res) => {
    const { groupId, userId } = req.body;
    try {
      await connection.query('UPDATE group_members SET status = $1 WHERE group_id = $2 AND member_id = $3', ['accepted', groupId, userId]);
      return res.status(200).json({ message: 'Invitation accepted' });
    } catch (err) {
      let errorMessage = "Not Sucessful Sent";
      if (err instanceof Error) {
          errorMessage = err.message;
        }
      res.status(500).send('errorMessage');
    }
  }); 


  app.post('/group/invitation/reject', async (req, res) => {
    const { groupId, userId } = req.body;
    try {
      await connection.query('UPDATE group_members SET status = $1 WHERE group_id = $2 AND member_id = $3', ['rejected', groupId, userId]);
      return res.status(200).json({ message: 'Invitation Rejected' });
    } catch (err) {
      let errorMessage = "Invitation Unsuccessful";
      if (err instanceof Error) {
          errorMessage = err.message;
        }
      res.status(500).send('errorMessage');
    }
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

