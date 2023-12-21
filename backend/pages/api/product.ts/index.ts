import { Request,Response } from "express"
import connectDatabase from "../../../config/database";
import products from "../../products/product";
export default async function handler(req:Request,res:Response){
  
  const {method}=req;
  connectDatabase
  if(method==="GET"){
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