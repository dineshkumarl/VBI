const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString } = require('graphql');
const { SongType }  = require('../../../songs/api');
const {songListResolver} = require('./resolvers');

const songQuery = new GraphQLObjectType({
    name:'songlist',
    fields:()=>({
        playlists:{type: GraphQLString, resolve:()=>{ return "Hello" }},
        songs:{
            type: GraphQLList(SongType),
            resolve:songListResolver
        }
    })
})

const schema = new GraphQLSchema({
    query:songQuery
})

module.exports = schema;
