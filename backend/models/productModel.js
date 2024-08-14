import express  from 'express';
import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const productSchema  = new Schema({

    name : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required: true,
    },

    description : {
        type : String,
        required : true
    },

    productImage : {
        type : String,
        required :true
    }

});


export default mongoose.model('Product', productSchema);

