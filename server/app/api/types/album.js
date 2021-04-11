const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } = require("graphql");
const {SingerType} = require('./singer');


const AlbumType = new GraphQLObjectType({
    name:"album",
    description:"",
    fields:()=>({
        _id:{type: GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLNonNull(GraphQLString)},
        description:{type: GraphQLString},
        songs: {
            type : GraphQLList(SingerType),
            resolve: ()=>{
                //TODO: query the data from mongo and return.
                return [{
                    id:1,
                    name:"sample",
                    singers:["",""],
                    albumId:1
                }]
            }
        }
    })
})

module.exports = {
    AlbumType
}
