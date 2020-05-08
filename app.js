var express = require('express')
var fs = require('fs')
var path = require('path')
var app = express();
var bodyParser = require('body-parser') //required to parse request body data

var User = require('./classes/User')
var ToDo = require('./classes/ToDo')

//middleware
var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
  }
  
app.use(myLogger)
app.use(bodyParser.json({limit:'10mb'}));
// User API's 

app.post('/user/register',(req,res)=>{
    var user = new User({
        "username" : req.body.username,
        "email" : req.body.email,
        "password" : req.body.password});
    //encrypt password before saving it

    user.save(user).then((result)=>{
        if(result.affectedRows==1){
            res.sendStatus(200);
        }else{
            res.sendStatus(500)
        }
        
    },(err)=>{
        res.sendStatus(500)
    });
    
});

app.post('/user/login',(req,res)=>{
    var user = new User({
        email : req.body.email,
        password : req.body.password
    })
    user.login(user).then((result)=>{
        if(result.length>0){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);    
        }
    },(err)=>{
        res.sendStatus(500);
    })
});

app.put('/user/modify',(req,res)=>{
    var tmp = {}
    if(req.body.username){
        tmp['username'] = req.body.username
    }
    if(req.body.email){
        tmp['email'] = req.body.email
    }
    tmp['password'] = req.body.password
    var user = new User(tmp)
    user.update(user).then((result)=>{
        if(result.affectedRows==1){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);    
        }
    },(err)=>{
        console.log(err)
        res.sendStatus(500);
    })
})

//Task APIs

app.post('/todo/add',(req,res)=>{
    var task = new ToDo({
        "title" : req.body.title,
        "description" : req.body.description,
        "status" : req.body.status,
        "user_email" : req.body.user_email
    });

    task.save(task).then((result)=>{
        if(result.affectedRows==1){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500)
        }
    },(err)=>{
        console.log('err ',err);
        
        res.sendStatus(500)
    });
});


app.put('/todo/modify',(req,res)=>{
    var tmp ={
        id : req.body.id
    }
    if(req.body.title){
        tmp['title'] = req.body.title
    }
    if(req.body.description){
        tmp['description'] = req.body.description
    }
    if(req.body.status){
        tmp['status'] = req.body.status
    }
    var task = new ToDo(tmp);

    task.update(task).then((result)=>{
        if(result.affectedRows==1){
            res.sendStatus(200);
        }
        else{
            res.sendStatus(500)
        }
    },(err)=>{
        res.sendStatus(500)
    });
});

app.get('/todo/view',(req,res)=>{
    var todo = new ToDo({
        user_email : req.query.email
    })
    todo.view(todo).then((result)=>{
        res.send({data:result})
    },(err)=>{
        res.sendStatus(404)
    })
});

app.delete('/todo',(req,res)=>{
    var todo = new ToDo({
        id : req.query.id
    })
    todo.delete(todo).then((result)=>{
        if(result.affectedRows==1){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(500)
        }
    },(err)=>{
        res.sendStatus(404)
    })
})

app.use(function(req, res, next) {
    console.log("404 Error - " + req.path);
    var err = new Error('Not Found');
    err.status = 404;
    // Website you wish to allow to connect
  
    next(err);
  });

module.exports = app;
