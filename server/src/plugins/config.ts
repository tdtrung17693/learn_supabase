import { Static, Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import dotenv from 'dotenv';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export enum NodeEnv {
  development = 'development',
  test = 'test',
  production = 'production',
}

const ConfigSchema = Type.Strict(
  Type.Object({
    NODE_ENV: Type.Enum(NodeEnv),
    LOG_LEVEL: Type.String(),
    API_HOST: Type.String(),
    API_PORT: Type.String(),
    CORS_ALLOWED_ORIGINS: Type.String(),
    SUPABASE_URL: Type.String(),
    SUPABASE_SERVICE_KEY: Type.String(),
    SUPABASE_JWT_SECRET: Type.String(),
  }),
);

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allowUnionTypes: true,
});

export type Config = Static<typeof ConfigSchema>;

if (process.env.NODE_ENV !== NodeEnv.production) {
  dotenv.config();
}

const configPlugin: FastifyPluginAsync = async (server) => {
  const validate = ajv.compile(ConfigSchema);
  const valid = validate(process.env);
  if (!valid) {
    throw new Error(`.env file validation failed - ${JSON.stringify(validate.errors, null, 2)}`);
  }
  server.decorate('config', process.env);
};

declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
  }
}

export default fp(configPlugin);
