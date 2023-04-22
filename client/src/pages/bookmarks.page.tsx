import { useLoaderData, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AuthProps } from "../types";
import { BookmarkList } from "../components/bookmark/BookmarkList";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth.context";
import { Bookmark } from "../components/bookmark/bookmark.type";
import { deleteBookmark, getBookmarks } from "../services/bookmark.service";

interface BookmarkListPageProps extends AuthProps {}

export const BookmarkListPage: React.FC<BookmarkListPageProps> = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { bookmarks: loadedBookmarks } = useLoaderData() as {
    bookmarks: Bookmark[];
  };
  const [bookmarks, setBookmarks] = useState(loadedBookmarks);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      const bookmarks = await getBookmarks();

      setBookmarks(bookmarks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout user={user}>
      <h1>Bookmarks</h1>
      <BookmarkList
        bookmarkDeleteHandler={async function (id: string) {
          await deleteBookmark(id, accessToken);
          fetchBookmarks();
        }}
        bookmarks={bookmarks}
        isLoading={false}
      />
    </MainLayout>
  );
};
