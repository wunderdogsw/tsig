import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  useScrollTrigger
} from "@material-ui/core";
import { Add, FormatListBulleted, Menu } from "@material-ui/icons";

import { useStyles } from "../common/styles";
import Drawer from "../Drawer/Drawer";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = props => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const navigate = useHistory().push;

  const [drawerOpen, setDrawerOpen] = useState(false);

  const showAscentNavigation =
    useLocation().pathname.substring(0, 7) === "/ascent";

  const ascentNavigation = (
    <>
      <IconButton onClick={_ => navigate("/ascent/add")}>
        <Add />
      </IconButton>
      <IconButton onClick={_ => navigate("/ascent/list")}>
        <FormatListBulleted />
      </IconButton>
    </>
  );

  return (
    <>
      <Slide direction="down" in={!trigger}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={_ => setDrawerOpen(!drawerOpen)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.flexGrow}>
              {props.title}
            </Typography>
            {showAscentNavigation ? ascentNavigation : null}
          </Toolbar>
        </AppBar>
      </Slide>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
};

export default Header;
