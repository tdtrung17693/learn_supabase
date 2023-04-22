import { User } from "@supabase/supabase-js";
import React, { useCallback, useEffect } from "react";
import { supabase } from "./supabaseClient";

interface AuthContextType {
  user: User | null;
  checkingUser: boolean;
  accessToken: string;
}
export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  accessToken: "",
  checkingUser: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  let [user, setUser] = React.useState<any>(null);
  let [accessToken, setAccessToken] = React.useState<string>("");
  let [checkingUser, setCheckingUser] = React.useState(false);

  const checkUser = useCallback(async () => {
    try {
      setCheckingUser(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      supabase.auth.signOut();
      setCheckingUser(false);
    }
    setCheckingUser(false);
  }, []);

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      setUser(null);
      setAccessToken("");
    } else if (event === "SIGNED_IN") {
      setUser(session?.user ?? null);
      setAccessToken(session?.access_token || "");
    }
  });
  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", checkUser);

    return () => window.removeEventListener("hashchange", checkUser);
  }, [checkUser]);

  let signout = () => {
    return supabase.auth.signOut();
  };

  let value = { user, accessToken, signout, checkingUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
