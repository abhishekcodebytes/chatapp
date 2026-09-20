import "dotenv/config";
import express from "express";
import cors from "cors";




import fs from "fs";
import path from "path";



import { clerkMiddleware } from '@clerk/express'

import user from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";


const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(),"public");

// it is important that u dont parse the webhooks event data ,it should be in the raw format
app.use("/api/webhooks/clerk",express.raw({type:"application/json"}),clerkWebhook)

app.use(express.json());
app.use(cors({origin:FRONTEND_URL,credentials:true}));
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{   
    res.status(200).json({ok:true});
});

app.use("/")

// // if public directroy exist serve the static file
// this is for production build
if(fs.existsSync(publicDir)){
app.use(express.static(publicDir))

app.get("/{*any}",(req,res,next)=>{
    res.sendFile(path.join(publicDir,"index.html"),(err)=> next(err));
})
}

app.listen(PORT,() => {
    connectDB();
   console.log("Server is up and running on PORT:",PORT);

if (process.env.NODE_ENV==="production")    job.start();

}


);
