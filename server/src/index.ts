import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

type Activity = {
  id: string;
  title: string;
  tenantId: string;
};

type QueryActivitiesArgs = {
  tenantId: string;
};

const typeDefs = `#graphql
  type Activity {
    id: ID!
    title: String!
    tenantId: String!
  }

  type Query {
    activities(tenantId: String!): [Activity!]!
  }
`;

const activitiesByTenant: Record<string, Activity[]> = {
  default: [
    { id: 'a-1', title: 'New scholarship program launched', tenantId: 'default' },
    { id: 'a-2', title: 'Orientation week planning', tenantId: 'default' },
  ],
  north: [
    { id: 'n-1', title: 'STEM fair registration opened', tenantId: 'north' },
    { id: 'n-2', title: 'Athletics budget approved', tenantId: 'north' },
  ],
  south: [
    { id: 's-1', title: 'Library renovation update', tenantId: 'south' },
    { id: 's-2', title: 'Alumni meetup scheduled', tenantId: 'south' },
  ],
};

const resolvers = {
  Query: {
    activities: (_: unknown, { tenantId }: QueryActivitiesArgs) => activitiesByTenant[tenantId] ?? [],
  },
};

const start = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = Number(process.env.PORT ?? 4000);
  const host = process.env.HOST ?? '0.0.0.0';

  const { url } = await startStandaloneServer(server, {
    // Bind to 0.0.0.0 so sandbox/proxy networking can reach the server.
    listen: { port, host },
  });

  // eslint-disable-next-line no-console
  console.log(`GraphQL server ready at ${url}`);
};

void start();
