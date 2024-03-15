import { Request,Response } from "express"
import connectDatabase from "../../../config/database";
import CCart from '../../../models/ccheckout'
export default async function handler(req:Request,res:Response){
  
  const {method}=req;
  connectDatabase()
  if(method==="GET"){
    try{
      const cartItems=await CCart.find();
      res.status(200).json(cartItems)
    } catch(err){
      res.status(500).json(err)
    }
  }
  if(method==="POST"){
    try{
      const CheckoutCart= await CCart.create(req.body);
      res.status(201).json(CheckoutCart)
      req.body

    }catch(err){
      res.status(500).json(err);
    }
  }
  
}