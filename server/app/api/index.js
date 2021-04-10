const { GraphQLObjectType, GraphQLList, GraphQLSchema, GraphQLString, GraphQLInt } = require('graphql');
const { SongType }  = require('../../songs/api/types/song');
const { PlayListType } = require('../../playlists/api/types/playlist');
const {songListResolver} = require('../../songs/api/resolvers');
const {playListResolver, createPlayListResolver, addSongToPlaylist} = require("../../playlists/api/resolvers")

const vbiQuery = new GraphQLObjectType({
    name:'vbiMusic',
    fields:()=>({
        playlists:{
            type: GraphQLList(PlayListType),
            args:{
                id:{type:GraphQLString}
            },
            resolve:playListResolver
        },
        songs:{
            args:{
                title:{type: GraphQLString}
            },
            type: GraphQLList(SongType),
            resolve:songListResolver
        }
    })
})

const vbiMutation = new GraphQLObjectType({
    name:"vbiMusicMutation",
    fields:()=>({
        createPlaylist:{
            args:{
                name:{type:GraphQLString}
            },
            type: PlayListType,
            resolve: createPlayListResolver
        },
        addSongToPlaylist:{
            args:{
                songId:{type: GraphQLInt},
                playListId:{type: GraphQLInt}
            },
            type:PlayListType,
            resolve: addSongToPlaylist
        }
    })
})

const schema = new GraphQLSchema({
    query:vbiQuery,
    mutation:vbiMutation
})

module.exports = schema;
