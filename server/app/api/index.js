const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString } = require('graphql');
const { SongType }  = require('../../songs/api/types/song');
const { PlayListType } = require('../../playlists/api/types/playlist');
const {songListResolver} = require('../../songs/api/resolvers');
const {playListResolver} = require("./resolvers")

const vbiQuery = new GraphQLObjectType({
    name:'vbiMusic',
    fields:()=>({
        playlists:{
            type: GraphQLList(PlayListType),
            resolve:playListResolver
        },
        songs:{
            type: GraphQLList(SongType),
            resolve:songListResolver
        }
    })
})

const schema = new GraphQLSchema({
    query:vbiQuery
})

module.exports = schema;
