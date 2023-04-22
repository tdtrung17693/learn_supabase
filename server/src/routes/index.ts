import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { HealthCheckSchema } from './index.schema';

const routes: FastifyPluginAsync = async (server) => {
  server.get(
    '/healthz',
    {
      schema: HealthCheckSchema,
    },
    async function () {
      return 'ok';
    },
  );
};

export default fp(routes);
