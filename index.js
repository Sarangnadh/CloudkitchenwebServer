//serverCreation

//import express  
const express = require('express')

//import jwt 
const jwt = require('jsonwebtoken')

//import cors
const cors =require('cors')
//import dataservices
const dataService = require('./services/data.service')

//server app creation using express

const app = express()

//cors use in server app
app.use(cors({
    origin:'http://localhost:4200'
}))

//parse json data

app.use(express.json())

//application middleware

const appMiddleware = (req, res, next) => {
    console.log("Application middleware...");
    next()
}

//use middleware in app
app.use(appMiddleware)



const jwtMiddleware = (req, res, next) => {
    //fetch
    try {
        // token= req.body.token
        token = req.headers['x-acc-token']
        //verify
        const data = jwt.verify(token,'super290719')
        console.log(data);
       req.currentMobno = data.currentMobno
        next()
    }

    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Please Log In"
        })
    }

}

//server register

app.post('/register', (req, res) => {
    //register solving
    //   const result=  
    dataService.register(req.body.username, req.body.mobno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)

        })

})


// server login

app.post('/login', (req, res) => {
    //loginsolving

    dataService.login(req.body.mobno, req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)

    })
})

//order 
app.post('/order', jwtMiddleware, (req, res) => {
      dataService.order(req,req.body.fullname, req.body.mobno, req.body.pswd, req.body.address, req.body.item, req.body.GrandTotal)
      .then(result=>{
        res.status(result.statusCode).json(result)

      })
})



//orderhistory 
app.post('/orderhistory', jwtMiddleware, (req, res) => {
    // const result = 
    dataService.orderhistory( req.body.mobno,)
    .then(result=>{
    res.status(result.statusCode).json(result)

    })
})

//delete
app.delete('/deleteAcc/:mobno',jwtMiddleware,(req,res)=>{
    // deletesolving
    dataService.deleteAccc(req.params.mobno,)
    .then(result=>{
    res.status(result.statusCode).json(result)

    })
})



//user request resolving

//GET REQUEST- to fetch data
app.get('/', (req, res) => {
    res.send("Get Request")
})

//POST REQUEST -to create data
app.post('/', (req, res) => {
    res.send("Post Request")
})

//PUT REQUEST -to modify entire data
app.put('/', (req, res) => {
    res.send("Put Request")
})

//PATCH REQUEST 
app.patch('/', (req, res) => {
    res.send("Patch Request")
})


//DELETE REQUEST
app.delete('/', (req, res) => {
    res.send("Delete Request")
})


//set up port number to the  server app

app.listen(3000, () => {
    console.log("Server started at 3000...");
})