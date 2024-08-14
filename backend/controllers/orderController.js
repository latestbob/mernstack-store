import express from 'express';
import orderModel from '../models/orderModel.js';
import mongoose from 'mongoose';


export async function createOrder(req, res){

    const {name, email, phone, address, cartItems, amount} = req.body;

    try {

        const order = new orderModel({name, email, phone, address, cartItems, amount});

        await order.save();

        return res.status(200).json({
            "status":"success",
            "order":order
        });
        
    } catch (error) {

 
        return res.status(400).json({
            "status":"failed",
            "message":"Unable to create a new order"
        });
    }
}
