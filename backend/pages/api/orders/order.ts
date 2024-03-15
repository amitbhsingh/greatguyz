import { Request,Response } from "express"
import connectDatabase from "../../../config/database";
import Order from '../../../models/orders'
export default async function handler(req:Request,res:Response){
  
  const {method}=req;
  connectDatabase
  if(method==="GET"){
  }
  if(method==="POST"){
    try{
      const order= await Order.create(req.body);
      res.status(201).json(order)
      req.body

    }catch(err){
      res.status(500).json(err);
    }
  }
  
}