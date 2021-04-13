const User = require('../models');
const bcrypt = require('bcrypt');
const _get = require('lodash.get');

const checkUserLoggedIn = async(session)=>{
    const userName = _get(session, 'user.userName');
    if(!userName){
        return false;
    }else{
        return true;
    }
}

const getUser = async (userName)=>{
    const existingUser = await User.findOne({userName : userName});
    return existingUser;
}

const checkUserAuthentic = async(userName, password)=>{
    let user = null;
    let isValidPassword = false;
    try{
       user = await getUser(userName);
    }catch(e){
        return [{code: 500, message: 'Error in fetching the user'}];
    }
    if(!user){
        return [{code:401, message:'invalid user'}];
    }
    try{
        isValidPassword = bcrypt.compareSync(password, user.password);
    }catch(e){
        return [{code: 500, message: "Error in parsing the credentials"}];
    }
    if(isValidPassword){
        return [null, {userName: user.userName, authorizations: user.authorizations}];
    }else{
        return [{code: 401, message: 'User authentication failed'}]
    }
}

const registerUser = async (userName, password)=>{
    const existingUser = await getUser(userName);
    let hashedPassword;
    try{
        hashedPassword = bcrypt.hashSync(password, parseInt(process.env.HASH_ROUND || 10));
    }catch(e){
        console.log('Error in hashing the password :: ', e);
        return [{code:500, message:'Error in parsing the error'}];
    }
    if(!existingUser){
        const user = new User({
            userName,
            password:hashedPassword
        })
        try{
            const savedUser = await user.save();
        }catch(e){
            console.log('error in saving the user :: ', e);
            return [{code:401, message:'Error in registering the user'}];
        }
        return [null,user.toJSON()];
    }else{
        return [{code:401, message:'Username already exists'}];
    }
}


module.exports = {registerUser, checkUserAuthentic, checkUserLoggedIn}