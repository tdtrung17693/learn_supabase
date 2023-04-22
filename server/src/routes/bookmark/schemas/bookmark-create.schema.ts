import { FastifySchema } from 'fastify';

export interface BookmarkCreateBody {
  title: string;
  url: string;
}

export const BookmarkCreateBody = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    url: { type: 'string' },
  },
  required: ['title', 'url'],
};

export const BookmarkCreateSchema: FastifySchema = {
  body: BookmarkCreateBody,
  description: 'Create a new bookmark',
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        url: { type: 'string' },
        user_id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    },
  },
};
