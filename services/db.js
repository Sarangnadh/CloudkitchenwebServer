//DB CONNECTION


//import mongoose
const mongoose = require('mongoose')

//connection string
mongoose.connect('mongodb://127.0.0.1:27017/cloudkitchenweb',{
    useNewUrlParser:true

})

//model

const Customer= mongoose.model('Customer',{
    mobno:Number,
    username:String,
    password:String,
    order:[],
    orderHistory:[]
})


module.exports={
Customer
}














