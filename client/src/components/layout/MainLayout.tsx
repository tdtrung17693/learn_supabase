import { ReactNode } from "react";
import { AuthProps } from "../../types";
import { Header } from "../header/Header";

export const MainLayout: React.FC<AuthProps & { children: ReactNode }> = (
  props
) => {
  return (
    <div className="app">
      <Header user={props.user} />
      <div className="container">{props.children}</div>
    </div>
  );
};
