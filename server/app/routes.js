const express = require('express');
const expressGraphQL = require('express-graphql');
const router = express.Router();
const schema = require('./api');

router.use('/v1/vbi', expressGraphQL.graphqlHTTP({
   graphiql:(process.env.NODE_ENV==='development'),
   schema
}));

module.exports = router;
