import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";

import useUser from "../../hooks/useUser";

export default function AdminRoute<T extends RouteProps>(props: T) {
  const { children, ...rest } = props;
  const { username } = useUser();
  console.log(username); // TODO
  // TODO: Needs proper authentication + user route authorization + user support for admin role in backend
  const isAdmin = process.env.NODE_ENV === "development";
  return (
    <Route {...rest}>{isAdmin ? children : <Redirect to="/login" />}</Route>
  );
}
