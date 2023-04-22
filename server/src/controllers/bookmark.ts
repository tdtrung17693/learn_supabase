import { FastifyReply, FastifyRequest } from 'fastify';
import * as bookmarkRepository from 'repositories/bookmark.repository';
import { BookmarkCreateBody } from 'routes/bookmark/schemas/bookmark-create.schema';
import { BookmarkDeleteParams } from 'routes/bookmark/schemas/bookmark-delete.schema';

export const createBookmark = async (
  req: FastifyRequest<{ Body: BookmarkCreateBody }>,
  res: FastifyReply,
) => {
  const { title, url } = req.body;
  const bookmark = await bookmarkRepository.createBookmark(
    {
      title,
      url,
      user_id: req.user.id,
    },
    req.supabase,
  );

  res.status(201).send(bookmark);
};

export const deleteBookmark = async (
  req: FastifyRequest<{ Params: BookmarkDeleteParams }>,
  res: FastifyReply,
) => {
  const { id } = req.params;
  await bookmarkRepository.deleteBookmark(
    {
      id,
      user_id: req.user.id,
    },
    req.supabase,
  );
  res.status(200);
};
