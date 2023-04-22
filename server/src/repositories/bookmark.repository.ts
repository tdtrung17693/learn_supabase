import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

interface BookmarkCreateDto {
  title: string;
  url: string;
  user_id: string;
}
export async function createBookmark(
  bookmark: BookmarkCreateDto,
  supabase: SupabaseClient<Database>,
) {
  const { data, error } = await supabase.from('bookmarks').insert(bookmark).select();
  if (error) throw error;
  return data[0];
}

interface BookmarkDeleteDto {
  id: string;
  user_id: string;
}
export async function deleteBookmark(
  bookmark: BookmarkDeleteDto,
  supabase: SupabaseClient<Database>,
) {
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .match({ id: bookmark.id, user_id: bookmark.user_id });
  if (error) throw error;
  return data;
}
