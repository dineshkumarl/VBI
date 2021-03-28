const express = require('express');
const expressGraphQL = require('express-graphql');
const router = express.Router();


router.get('/v1/vbi/songs',(_,res)=>{
   res.json({message:"Hello"})
})
module.exports = router;
