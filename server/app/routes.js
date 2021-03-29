const express = require('express');
const expressGraphQL = require('express-graphql');
const router = express.Router();
const schema = require('./api');
const path = require('path');

router.use(express.static(path.resolve(__dirname,'../../client/build')));

router.use('/v1/vbi', expressGraphQL.graphqlHTTP({
   graphiql:(process.env.NODE_ENV==='development'),
   schema
}));

module.exports = router;
