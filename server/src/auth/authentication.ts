import FastifyAuth from '@fastify/auth';
import { User } from '@supabase/supabase-js';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const authentication: FastifyPluginAsync = async (server) => {
  server
    .decorate('asyncVerifySupabaseJWT', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        if (!request.headers.authorization) {
          throw new Error('No token was sent');
        }
        const token = request.headers.authorization.split(' ')[1];
        const response = await request.supabase.auth.getUser(token);
        console.log(response);
        if (!response.data?.user) {
          throw new Error('Invalid token');
        }
        request.user = response.data.user;
      } catch (error) {
        reply.code(401).send({
          error: 'invalid_token',
          message: 'Invalid token',
        });
      }
    })
    .register(FastifyAuth);
};

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
    token: string;
  }
  interface FastifyInstance {
    asyncVerifySupabaseJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(authentication);
