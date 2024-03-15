import { Request,Response } from "express"
import connectDatabase from "../../../config/database";
import LocalUser from '../../../models/userdb'
export default async function handler(req:Request,res:Response){
  
  const {method}=req;
  connectDatabase
  if(method==="GET"){
  }
  if(method==="POST"){
    try{
      const locUser= await LocalUser.create(req.body);
      res.status(201).json(locUser)
      req.body

    }catch(err){
      res.status(500).json(err);
    }
  }
  
}