import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { BookmarkList } from "../components/bookmark/BookmarkList";
import { MainLayout } from "../components/layout/MainLayout";
import { OAuthProviders } from "../config";
import { supabase } from "../supabaseClient";
import { AuthProps } from "../types";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import classes from "./HomePage.module.css";

interface HomePageProps extends AuthProps {}
export const HomePage: React.FC<HomePageProps> = (props) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/bookmarks");
    }
  }, [user]);

  return (
    <MainLayout user={props.user}>
      <div className={classes["auth-block"]}>
        {!user ? (
          <Auth
            providers={OAuthProviders}
            supabaseClient={supabase}
            theme="dark"
            appearance={{
              theme: ThemeSupa,
            }}
            onlyThirdPartyProviders={true}
          />
        ) : (
          ""
        )}
      </div>
    </MainLayout>
  );
};
