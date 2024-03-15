import { Request,Response } from "express"
import connectDatabase from "../../../config/database";
import products from "../../../models/products";
export default async function handler(req:Request,res:Response){
  
  const {method}=req;
  connectDatabase()
  if(method==="GET"){
    try{
      const product=await products.find()
      res.status(200).json(product)
  }catch(err){
    res.status(500).json(err)
  }
}
  if(method==="POST"){
    try{
      const product= await products.create(req.body);
      res.status(201).json(product)
      req.body

    }catch(err){
      res.status(500).json(err);
    }
  }
  
}