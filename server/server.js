const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { typeDefs, resolvers } = require('./schemas');
const app = express();
const PORT = process.env.PORT || 3001;
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false, 

});

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
 