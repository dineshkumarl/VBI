const express = require('express');
const router = express.Router();
const _get = require('lodash.get');
const {validateUserEmail, validateUserCreds} = require('./middlewares');
const {registerUser, checkUserAuthentic} = require('./api'); 

router.post('/user/register', validateUserEmail, async(req,res)=>{
    const userName = req.body.username;
    const password = req.body.password;
    const [error, user] = await registerUser(userName, password);
    if(error){
        res.status(error.code);
        res.json({message: error.message});
    }else{
        res.json({status:"SUCCESS", message: "user registered successfully"});
    }
})

router.get('/user/session', (req, res)=>{
    res.json({user : _get(req,'session.user')})
})

router.post('/user/login', validateUserCreds, async (req,res)=>{
    const {username, password} = req.body;
    const [error, user] = await checkUserAuthentic(username, password);
    if(error){
        res.status(error.code);
        res.json({message: error.message});
    }else{
        req.session.user = user;
        res.json({status:'SUCCESS', message: "logged in successfully"})
    }
})

router.get('/user/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.status(200);
        res.json({status:"SUCCESS", message: 'logged out successfully'})
    })
})

module.exports = router;