import { useContext, useState } from "react";
import { CreateBookmark } from "./bookmark.type";
import { AuthContext } from "../../auth.context";
import classes from "./BookmarkCreateForm.module.css";

interface BookmarkCreateFormProps {
  bookmarkCreateHandler: (bookmark: CreateBookmark) => Promise<void>;
}

export const BookmarkCreateForm: React.FC<BookmarkCreateFormProps> = (
  props
) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await props.bookmarkCreateHandler({ title, url });
    setIsLoading(false);
  };

  return (
    <form className={classes.bookmarkForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={classes.bookmarkForm__input}
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className={classes.bookmarkForm__input}
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        type="submit"
        className={classes.bookmarkForm__button}
        disabled={!title || !url || isLoading}
      >
        {isLoading ? "Creating..." : "Add Bookmark"}
      </button>
    </form>
  );
};
