import { FastifySchema } from 'fastify';

export interface BookmarkDeleteParams {
  id: string;
}

export const BookmarkDeleteBody = {
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
};

export const BookmarkDeleteSchema: FastifySchema = {
  params: BookmarkDeleteBody,
  description: 'Delete a bookmark',

  response: {
    200: {
      type: 'null',
    },
  },
};
