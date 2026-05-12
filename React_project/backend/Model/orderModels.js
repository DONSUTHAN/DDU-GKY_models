const mongoose = require ('mongoose')

const orderSchema = new mongoose.Schema({
    
    totalPrice: { type: Number,required: true },
    status: { type: String, default: "Pending"},


    customer: {
      type: mongoose.Schema.Types.ObjectId,
      //specify data stored in this feild must be a valid 12 byte
      ref: "User"
      //link the actual user in the quary
    },

    products: [{
        //in array
      
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
          // mongoose to which model to look at when you want to join the data .in this case it point to the product model
        },

        quantity: Number
      
    }],

    
}, { timestamps: true })

module.exports =  mongoose.model("Order", orderSchema)