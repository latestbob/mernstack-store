import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({


    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
    },

    amount : {
        type : Number,
        required : true,
    },

    cartItems: {
        type: [Object],
       required: true,
      },


});

export default mongoose.model("Order",orderSchema);