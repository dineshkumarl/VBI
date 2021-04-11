const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString } = require("graphql");

const SingerType = new GraphQLObjectType({
    name:"singer",
    description:"",
    fields:()=>({
        id: {type: GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLNonNull(GraphQLString)}
    })
})

module.exports = {
    SingerType
}
