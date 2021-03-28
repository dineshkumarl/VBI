const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {SongType} = require('../../../songs/api/types/song');
const DateType = require('../../../app/api/types/date');
const { songListResolver} = require('../resolvers');


const PlayListType = new GraphQLObjectType({
    name:"playlist",
    description:"",
    fields:()=>({
        id:{type: GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        created:{
           type:DateType
        },
        lastModified:{
            type:DateType
        },
        songs:{
            type:GraphQLList(SongType),
            resolve: songListResolver
        }
    })
})

module.exports = {
    PlayListType
}
