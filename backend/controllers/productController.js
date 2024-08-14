import express from 'express';
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';


export async function getAllProducts(req,res){

    let products;


    try {
        products = await productModel.find();

        return res.status(200).json({
            "status":"success",
            "products":products
        });


    } catch (error) {
        return res.status(400).json({
            "status":"failed",
            "message":"Error getting products"
        });
    }

}


export async function getUniqueProduct(req, res){

    const {id} = req.params;

    let product;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            "status":"failed",
            "error":"Invalid ID format. Must be a 24-character hex string."
        });
    }

    try {

      
            product = await productModel.findById(id);

            if(!product){
                return res.status(400).json("product not found");
            }

            else{
                return res.status(200).json({
                    "status":"success",
                    "product":product,
                });
            }
        
       
        
    } catch (error) {
        return res.status(500).json({ 'message': 'An error occurred while retrieving the user' });
    }
}


export async function addProduct(req, res){

    const {name, price, description, productImage} = req.body;

    try {

        const newProduct = new productModel({
            name, price, description, productImage
        });

        await newProduct.save();

        return res.status(201).json({
            "status":"success",
            "product": newProduct
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json("Unable to add product");
    }
}