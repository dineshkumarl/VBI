const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {AlbumType} = require('../../../app/api/types/album');
const {SingerType} = require('../../../app/api/types/singer');
const {albumResolver, singersResolver} = require('../resolvers');


const SongType = new GraphQLObjectType({
    name:"song",
    description:"",
    fields:()=>({
        id:{type: GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLString},
        singers:{
           type:GraphQLList(SingerType),
           resolve:singersResolver
        },
        album: {
            type: AlbumType,
            resolve:albumResolver
        }
    })
})

module.exports = {
    SongType
}
