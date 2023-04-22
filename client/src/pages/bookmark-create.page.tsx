import { useLoaderData, useNavigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { AuthProps } from "../types";
import { BookmarkList } from "../components/bookmark/BookmarkList";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { Bookmark, CreateBookmark } from "../components/bookmark/bookmark.type";
import { BookmarkCreateForm } from "../components/bookmark/BookmarkCreateForm";
import { createBookmark } from "../services/bookmark.service";

interface BookmarkCreatePageProps extends AuthProps {}

export const BookmarkCreatePage: React.FC<BookmarkCreatePageProps> = () => {
  const { user, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <MainLayout user={user}>
      <h1>New Bookmark</h1>
      <div>
        <BookmarkCreateForm
          bookmarkCreateHandler={async function (bookmark: CreateBookmark) {
            await createBookmark(bookmark, accessToken);
            navigate("/bookmarks");
          }}
        />
      </div>
    </MainLayout>
  );
};
