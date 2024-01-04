//import jwt 
const jwt = require('jsonwebtoken')
//import db.js
const db = require('./db')


//database
// db = {
//   8301056189: { "mobno": 8301056189, "username": "Sarang", "password": 6189, order:[],orderHistory:[]  },
//   8301088991: { "mobno": 8301088991, "username": "Vrijith", "password": 6188, order:[],orderHistory:[]  },
//   8301056179: { "mobno": 8301056179, "username": "Naveen", "password": 6187, order:[], orderHistory:[] }

// }




//register


const register = (username, mobno, password) => {
  return db.Customer.findOne({
    mobno

  }).then(customer => {

    if (customer) {
      console.log(customer);
      return {
        status: false,
        message: "Already Registred please login",
        statusCode: 401
      }

    }
    else {
      const newCustomer = new db.Customer({
        mobno,
        username,
        password,
        order: [],
        orderHistory: []
      })
      newCustomer.save()

      return {
        status: true,
        message: "Successfully Registered",
        statusCode: 200
      }

    }
  })

}

//login

const login = (mobno, pswd) => {

  return db.Customer.findOne({
    mobno,
    password: pswd
  }).then(customers => {
    if (customers) {
      customerName = customers.username
      currentMobno = mobno
      // token generate
      token = jwt.sign({
        //store mobno inside token
        currentMobno: mobno
      }, 'super290719')

      return {
        status: true,
        message: "Login  successfully",
        statusCode: 200,
        customerName,
        currentMobno,
        token
      }

    }
    else {

      return {
        status: false,
        message: "Invalid Mobile Number Or Password",
        statusCode: 401
      }
    }
  })

}






const order = (req,fullname, mobno, pswd, address, item, GrandTotal) => {
  currentMobno=req.currentMobno
  return db.Customer.findOne({
     mobno,
     password:pswd, 
  }).then(customer => {
    if (customer) {

      if(mobno!=req.currentMobno){
        return{
          status:false,
          message:"Permission Denied",
          statusCode:401
        }
      }
      
      customer.order.push({
        OrderItem: item,
        payAmount: GrandTotal,
        FullName: fullname,
        DeliveryAddress: address,
        Customer_Callnumber: mobno
      })
      customer.orderHistory.push({
          OrderItem: item,
          payAmount: GrandTotal,
          CustomerName: fullname,
          DeliveryAddress: address,
          CustomerCallnumber: mobno

        })
      customer.save();
      return {
        status: true,
        statusCode: 200,
        message: "Ordered Confirmed"
      }
    }
    else {
      return {
        status: false,
        message: "Invalid Mobile Number Or Password",
        statusCode: 401
      }
    }
  })
  
}


const orderhistory = (mobno) => {

  return db.Customer.findOne({
    mobno
  }).then(customer=>{
    if(customer){
      return {
        status: true,
        statusCode: 200,
        orderHistory: customer.orderHistory
      }
    }
    else{
      return {
        status: false,
        message: "User does not exist!!",
        statusCode: 401
      }
    }
  })

}



const deleteAccc =(mobno)=>{
 return db.Customer.deleteOne({
  mobno
}).then(customer=>{
  if(!customer){
    return {
      status: false,
      message: "Opertion Failed!!",
      statusCode: 401
    }
  }
  return{
    status:true,
    message:"Successfully Deleted",
    statusCode:200
  }
})
}



//Exports
module.exports = {
  register,
  login,
  order,
  orderhistory,
  deleteAccc
}


