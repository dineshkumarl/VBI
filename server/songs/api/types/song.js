const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const {AlbumType} = require('../../../app/api/types/album');
const {SingerType} = require('../../../app/api/types/singer');
const {albumResolver, singersResolver} = require('../resolvers');

const Duration = new GraphQLObjectType({
    name:"duration",
    fields:()=>({
        h:{type:GraphQLInt},
        m:{type:GraphQLInt},
        s:{type:GraphQLInt}
    })
})


const SongType = new GraphQLObjectType({
    name:"song",
    description:"",
    fields:()=>({
        _id:{type: GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLString},
        singers:{
           type:GraphQLList(SingerType),
           resolve:singersResolver
        },
        album: {
            type: AlbumType,
            resolve:albumResolver
        },
        duration:{
            type: Duration
        }
    })
})

module.exports = {
    SongType
}
