import 'reflect-metadata'
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { IS_PROD, PORT } from './constants';
import { MessageResolver } from './resolvers/message';

const main = async () => {
  
  const server = new ApolloServer({
    schema: await buildSchema({resolvers:[MessageResolver], validate: false})
  });
  
  server.listen({port: Number(PORT)}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main();