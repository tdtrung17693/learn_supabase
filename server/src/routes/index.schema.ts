import { FastifySchema } from 'fastify';

export const HealthCheckSchema: FastifySchema = {
  response: {
    200: {
      type: 'string',
    },
  },
};
