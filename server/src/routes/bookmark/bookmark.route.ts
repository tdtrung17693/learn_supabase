import { canDelete } from 'auth/policies/userCanDeleteBookmark';
import { createBookmark, deleteBookmark } from 'controllers/bookmark';
import { FastifyPluginCallback } from 'fastify';
import { BookmarkCreateSchema } from './schemas/bookmark-create.schema';
import { BookmarkDeleteSchema } from './schemas/bookmark-delete.schema';

export const bookmarkRouter: FastifyPluginCallback = async (server) => {
  server.addHook('preHandler', server.auth([server.asyncVerifySupabaseJWT]));

  server.post('/', {
    handler: createBookmark,
    schema: BookmarkCreateSchema,
  });

  server.delete('/:id', {
    preHandler: server.auth([canDelete]),
    handler: deleteBookmark,
    schema: BookmarkDeleteSchema,
  });
};
export default bookmarkRouter;
