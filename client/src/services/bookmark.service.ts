import { Bookmark, CreateBookmark } from "../components/bookmark/bookmark.type";
import { apiUrl } from "../config";
import { supabase } from "../supabaseClient";

export async function createBookmark(bookmark: CreateBookmark, token: string) {
    return fetch(`${apiUrl}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookmark)
    })
}

export async function getBookmarks(): Promise<Bookmark[]> {
    return supabase.from("bookmarks").select("*").then((data) => {
        return data.data as Bookmark[]
    })
}

export async function deleteBookmark(bookmarkId: string, token: string) {
    return fetch(`${apiUrl}/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
}
