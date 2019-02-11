const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
    {
        id: 5046214,
        title: 'Gujarat Tourism',
        author: 'J.K. Shah',
        price: '450',

    },
    {
        id: 6866289,
        title: 'Saurastra Tourism',
        author: 'M.S. Prashad',
        price: '500',
    },
    {
        id: 5355682,
        title: 'Somanath darshan',
        author: 'D.R. Vyas',
        price: '285',
    },
    {
        id: 9565435,
        title: 'Ahemdabad Tourism',
        author: 'A.D. Sharma',
        price: '350',
    },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    id: ID!
    title: String
    author: String
    price: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  
  type Query {
    books: [Book]
  }
  # The mutation root type, used to define all mutations.
  
  type Mutation {
  # A mutation to add a new channel to the list of channels
  addBooks(title: String!, author:String!, price:String!): Book
  removeBooks(id: Int ): Book
  editBooks (id: Int, title: String!, author:String!, price:String!) : Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
let nextId = 5046214;

const resolvers = {
    Query: {
        books: () => {
            return books;
            },
    },
    Mutation: {
        addBooks: (root, args) => {
            const newBooks = {id: nextId++ , title: args.title , author: args.author , price: args.price };
            books.push(newBooks);
            return newBooks;
        },
        removeBooks: (root, args) => {

            const newBooks = {id: args.id};
            index = books.findIndex(x => x.id == args.id);
            books.splice(index,1);
            return newBooks;
        },
        editBooks: (root, args) => {

            index = books.findIndex(x => x.id == args.id);
            const newBooks = {id: args.id, title: args.title , author: args.author , price: args.price };
            books[index].title = args.title;
            books[index].author = args.author;
            books[index].price = args.price;
            return newBooks;
        }
    },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
