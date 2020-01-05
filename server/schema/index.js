const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = graphql

var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '1'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '2'}
]

var authors = [
    {name: 'Patrick', age: 44, id: '1'},
    {name: 'Brandom', age: 42, id: '2'},
    {name: 'Terry', age: 66, id: '3'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
        type: AuthorType,
        resolve(parent, args) {
            console.log(parent)
            return _.find(authors, {id: parent.author.id})
        }
    }
  })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
        type: BookType,
        args: {
            id: {
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            // code to get data from db / other source
            _.find(books, {id: args.id})
        }
        
    },
    author: {
        type: AuthorType,
        args: {
            id: {
                type: GraphQLString,
            }
        },
        resolve(parent, args) {
            _.find(author, {id: args.id})
        }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return books
        }
    }
  }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})