import { useEffect, useState } from "react";
import "./App.css";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import { HomePage } from "./pages/home.page";
import { BookmarkListPage } from "./pages/bookmarks.page";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    /* when the app loads, check to see if the user is signed in */
    checkUser();
    /* check user on OAuth redirect */
    window.addEventListener("hashchange", function () {
      checkUser();
    });
  }, []);
  async function checkUser() {
    /* if a user is signed in, update local state */
    try {
      setLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      setUser(null);
    } else if (event === "SIGNED_IN") {
      setUser(session?.user ?? null);
    }
  });

  return (
    <div className="app">
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route
                path="/bookmarks"
                loader={async () => {
                  console.log("ASD");
                  if (!user) {
                    return redirect("/");
                  }
                }}
                element={<BookmarkListPage user={user} />}
              />
            </Routes>
          </Router>
        )}
      </div>
    </div>
  );
}

export default App;
