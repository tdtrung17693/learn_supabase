import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home.page";
import { BookmarkListPage } from "./pages/bookmarks.page";
import { AuthContext, AuthProvider } from "./auth.context";
import { supabase } from "./supabaseClient";
import { BookmarkCreatePage } from "./pages/bookmark-create.page";
import { getBookmarks } from "./services/bookmark.service";

const App = () => {
  const context = useContext(AuthContext);

  if (context.checkingUser) return <div>Loading...</div>;

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "bookmarks",

        children: [
          {
            loader: async () => {
              const bookmarks = await getBookmarks();
              return { bookmarks };
            },
            path: "",
            element: <BookmarkListPage />,
          },
          {
            path: "new/",
            element: <BookmarkCreatePage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
