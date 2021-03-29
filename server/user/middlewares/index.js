const USER_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validEmail = (email)=> USER_EMAIL_REGEX.test(String(email).toLowerCase())

const validateUserEmail = (req, res, next)=>{
   const userEmail = req.body.username;
   if(validEmail(userEmail)){
       next();
   }else{
       res.status(500)
       .json({message: 'invalid username/email address format'})
   }
}

const validateUserCreds = (req, res, next)=>{
    const {username, password} = req.body;
    if(validEmail(username) && password){
        next();
    }else{
        res.status(500)
       .json({message: 'invalid credentials'})
    }
}

module.exports = {validateUserEmail, validateUserCreds};