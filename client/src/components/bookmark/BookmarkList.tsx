import { useContext, useState } from "react";
import { AuthContext } from "../../auth.context";
import { Bookmark } from "./bookmark.type";
import classes from "./BookmarkList.module.css";

interface BookmarkListProps {
  bookmarkDeleteHandler: (id: string) => Promise<void>;
  bookmarks: Bookmark[];
  isLoading: boolean;
}

export const BookmarkList: React.FC<BookmarkListProps> = (props) => {
  const { bookmarks } = props;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState({ state: false, id: "" });

  const handleDeleteBookmark = async (id: string) => {
    setLoading({
      id,
      state: true,
    });
    await props.bookmarkDeleteHandler(id);

    setLoading({
      id: "",
      state: false,
    });
  };
  return (
    <div className={classes.bookmark}>
      {bookmarks.length > 0 ? (
        <ul className={classes.bookmark__list}>
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className={classes.bookmark__listItem}>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className={classes.bookmark__listItemLink}
              >
                {bookmark.title}
              </a>
              {user?.id === bookmark.user_id && (
                <button
                  className={classes.bookmark__listItemDelete}
                  onClick={() => handleDeleteBookmark(bookmark.id)}
                  disabled={loading.state}
                >
                  {loading.state && loading.id === bookmark.id
                    ? "Deleting.."
                    : "Delete"}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="bookmark__empty">No bookmarks added yet</div>
      )}
    </div>
  );
};
