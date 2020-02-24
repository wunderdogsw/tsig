// import React from "react";
// import { Route, RouteProps, Redirect } from "react-router-dom";

// import useUser from "../../hooks/useUser";

// export default function PrivateRoute<T extends RouteProps>(props: T) {
//   const { children, ...rest } = props;
//   const username = useUser().username;
//   return (
//     <Route {...rest}>{username ? children : <Redirect to="/login" />}</Route>
//   );
// }

import React from "react";
import { Route, RouteProps } from "react-router-dom";

export default function PrivateRoute<T extends RouteProps>(props: T) {
  const { children, ...rest } = props;
  return <Route {...rest}>{children}</Route>;
}
