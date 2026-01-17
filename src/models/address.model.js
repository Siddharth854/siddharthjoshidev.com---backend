const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    StreetAddress:{
        type:String,
        required: true
    },
    City:{
        type:String,
        required: true
    },
    State:{
        type:String,
        required: true
    },
    zipCode:{
        type:Number,
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "users",
    },
    mobile:{
        type: String,
        required: true
    }
    
})
const Address = mongoose.model("addresses",AddressSchema);
module.exports=Address  