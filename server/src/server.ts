import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import authentication from 'auth/authentication';
import fastify from 'fastify';
import supabase from 'plugins/supabase';
import bookmarkRoute from 'routes/bookmark/bookmark.route';
import indexRoute from 'routes/index';
import config from './plugins/config';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: {
    level: process.env.LOG_LEVEL,
  },
};

type Environment = keyof typeof envToLogger;
const environment: Environment = (process.env.NODE_ENV ?? 'development') as Environment;

const server = fastify({
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: true,
      useDefaults: true,
    },
  },
  logger: envToLogger[environment] ?? true,
  disableRequestLogging: true,
});

await server.register(swagger, {
  swagger: {
    info: {
      title: 'Bookmarks Manager API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [],
    definitions: {},
  },
});
await server.register(swaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});
await server.register(config);

await server.register(cors, {
  origin: server.config.NODE_ENV === 'production' ? server.config.CORS_ALLOWED_ORIGINS : '*',
});
await server.register(helmet);
await server.register(supabase);

await server.register(authentication);
await server.register(indexRoute);
await server.register(bookmarkRoute, { prefix: 'bookmarks' });

await server.ready();
server.swagger();

export default server;
