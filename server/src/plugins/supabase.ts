import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { Database } from 'types/supabase';

const supabasePlugin: FastifyPluginAsync<{ accessToken: string }> = async (server) => {
  server.decorateRequest('supabase', null);
  server.addHook('onRequest', async (request: FastifyRequest) => {
    const supabaseClient = createClient(
      server.config.SUPABASE_URL,
      server.config.SUPABASE_SERVICE_KEY,
    );

    request.supabase = supabaseClient;
  });
};

declare module 'fastify' {
  interface FastifyRequest {
    supabase: SupabaseClient<Database>;
  }
}

export default fp(supabasePlugin);
