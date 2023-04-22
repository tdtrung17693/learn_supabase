import { Link, useNavigate } from "react-router-dom";
import { AuthProps } from "../../types";
import classes from "./Header.module.css";
import { supabase } from "../../supabaseClient";
interface HeaderProps extends AuthProps {}
export const Header: React.FC<HeaderProps> = (props) => {
  const navigate = useNavigate();
  const signOutBtnClicked = async () => {
    await supabase.auth.signOut();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <div className={classes.header}>
      <Link
        className={`${classes.header__link} ${classes.header__linkLogo}`}
        to="/"
      >
        Bookmarks
      </Link>
      <Link className={classes.header__link} to="/bookmarks/new">
        New Bookmark
      </Link>
      {props.user ? (
        <a
          href="#"
          onClick={signOutBtnClicked}
          className={`${classes.header__link} ${classes.header__linkSignOut}`}
        >
          Sign Out
        </a>
      ) : (
        ""
      )}
    </div>
  );
};
