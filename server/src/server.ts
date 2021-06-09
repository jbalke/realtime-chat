import { ApolloServer } from 'apollo-server';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { PORT } from './constants';
import { MessageResolver } from './resolvers/message';

const main = async () => {
  const server = new ApolloServer({
    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket, context) => {
        console.log('Client connected');
      },
      onDisconnect: (webSocket, context) => {
        console.log('Client disconnected');
      },
    },
    schema: await buildSchema({
      resolvers: [MessageResolver],
      validate: false,
    }),
  });

  server.listen({ port: Number(PORT) }).then(({ url, subscriptionsUrl }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`);
  });
};

main();
