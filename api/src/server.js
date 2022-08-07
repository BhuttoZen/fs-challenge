import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import { middleware } from './middleware/index.js';
import admin from './config/firebase-config.js';


const app = express();
app.use(bodyParser.json());

const port = 5000;

app.use(cors());

app.use(middleware.decodeToken)
const db = admin.firestore();


app.post('/user_register', async ( req, res ) => {
    try{
        const id = req.body.email;
        const userJson = {
            email : req.body.email,
            password : req.body.password
        }
        const response = await db.collection("users").add(userJson);
        res.send(response);

    }
    catch(e)
    {
        res.send(e);
    }
  });

  app.post('/user_signin',( req, res ) => {
    try{
        const userJson = {
            email : req.body.email,
            password : req.body.password
        }

        res.send("User Logged In Succesfully!");

    }
    catch(e)
    {
        res.send(e);
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

