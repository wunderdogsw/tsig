import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AscentRoutes from "../Ascents/AscentRoutes";
import UserRoutes from "../Users/UserRoutes";
import About from "../About/About";
import Login from "../Login/Login";
import { useStyles } from "../common/styles";
import Notifications from "../Notifications/Notifications";

export type RouterProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

const MainRouter: React.FC<RouterProps> = props => {
  const { setTitle } = props;
  const classes = useStyles();
  return (
    <Container className={`${classes.flexGrow} ${classes.flexColumn}`}>
      <Switch>
        <Route path="/login">
          <Login setTitle={setTitle} />
        </Route>
        <PrivateRoute path="/ascent" className={classes.flexGrow}>
          <AscentRoutes setTitle={setTitle} />
        </PrivateRoute>
        <AdminRoute path="/user">
          <UserRoutes setTitle={setTitle} />
        </AdminRoute>
        <Route path="/about">
          <About setTitle={setTitle} />
        </Route>
        <Route>
          <h2>Main route not found</h2>
        </Route>
      </Switch>
      <Notifications />
    </Container>
  );
};

export default MainRouter;
