const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require("graphql");

const SingerType = new GraphQLObjectType({
    name:"singer",
    description:"",
    fields:()=>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)}
    })
})

module.exports = {
    SingerType
}
