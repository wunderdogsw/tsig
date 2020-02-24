import React, { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GoogleLogout } from "react-google-login";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@material-ui/core";
import { Person, Timeline, ExitToApp, People, Info } from "@material-ui/icons";

import useUser from "../../hooks/useUser";
import { logout } from "../../services/authService";
import ListItemLink from "./ListItemLink";
import { GOOGLE_CLIENT_ID } from "../Login/Login";
import { useStyles } from "../common/styles";

export type DrawerProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Drawer: React.FC<DrawerProps> = props => {
  const { open, setOpen } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useHistory().push;
  const username = useUser().username;

  const lougoutHandler = async () => {
    await logout(dispatch);
    setOpen(false);
    navigate("/login");
  };

  const privateItemsOrLogin = username ? (
    <>
      <List className={classes.drawer}>
        <ListItem>
          <ListItemText
            primary={`Logged in as ${username}`}
            className={classes.drawerLogoutItemText}
          />
          {GOOGLE_CLIENT_ID ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              onLogoutSuccess={lougoutHandler}
              onFailure={lougoutHandler}
              render={({ onClick }) => (
                <ListItemSecondaryAction title="Logout" onClick={onClick}>
                  <IconButton>
                    <ExitToApp />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            />
          ) : (
            <ListItemSecondaryAction title="Logout" onClick={lougoutHandler}>
              <IconButton>
                <ExitToApp />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <ListItemLink
          text="Ascents"
          to="/ascent"
          icon={<Timeline />}
          setOpen={setOpen}
        />
      </List>
      <Divider />
    </>
  ) : (
    <>
      <List className={classes.drawer}>
        <ListItemLink
          text="Login"
          to="/login"
          icon={<Person />}
          setOpen={setOpen}
        />
      </List>
      <Divider />
    </>
  );

  // TODO: See AdminRoute
  const adminItems =
    process.env.NODE_ENV === "development" ? (
      <>
        <List className={classes.drawer}>
          <ListItemLink
            text="Users"
            to="/user"
            icon={<People />}
            setOpen={setOpen}
          />
        </List>
        <Divider />
      </>
    ) : null;

  const publicItems = (
    <List className={classes.drawer}>
      <ListItemLink
        text="About"
        to="/about"
        icon={<Info />}
        setOpen={setOpen}
      />
    </List>
  );

  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      className={classes.drawer}
      swipeAreaWidth={30}
    >
      {privateItemsOrLogin}
      {adminItems}
      {publicItems}
    </SwipeableDrawer>
  );
};

export default Drawer;
