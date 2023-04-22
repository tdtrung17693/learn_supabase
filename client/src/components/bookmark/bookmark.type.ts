export interface Bookmark {
    user_id: string;
    id: string,
    title: string,
    url: string,
}

export interface CreateBookmark {
    title: string,
    url: string,
}
