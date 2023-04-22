import { FastifyReply, FastifyRequest } from 'fastify';
import { BookmarkDeleteParams } from 'routes/bookmark/schemas/bookmark-delete.schema';

export async function canDelete(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as BookmarkDeleteParams;
  const response = (await request.supabase
    .from('bookmarks')
    .select('*', { count: 'exact', head: true })
    .match({ id, user_id: request.user.id })) as { count: number };
  if (response.count === 0) {
    return reply.code(401).send({
      error: 'unauthorized_action',
      message: 'Unauthorized Action',
    });
  }
}
