import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core";
import { SportsHandball, TrendingUp } from "@material-ui/icons";

import { AscentType, RouteType } from "../../types/ascent";

enum Shade {
  Strong,
  Medium,
  Weak
}

const ascentTypeAndOpacityToColor = (
  ascentType: AscentType,
  opacity: number
) => {
  switch (ascentType) {
    case AscentType.Onsight:
      return `rgba(255,255,255,${opacity})`;
    case AscentType.Flash:
      return `rgba(255,165,0,${opacity})`;
    case AscentType.Redpoint:
      return `rgba(255,0,0,${opacity})`;
    case AscentType.Repeat:
      return `rgba(200,0,0,${opacity})`;
  }
};

const shadeToOpacity = (shade: Shade) => {
  switch (shade) {
    case Shade.Strong:
      return 1;
    case Shade.Medium:
      return 0.8;
    case Shade.Weak:
      return 0.2;
  }
};

export const ascentTypeToColor = (
  ascentType: AscentType,
  shade: Shade = Shade.Strong
) => ascentTypeAndOpacityToColor(ascentType, shadeToOpacity(shade));

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#282c34"
    }
  },
  overrides: {
    MuiButton: {
      text: {
        color: "#282c34"
      }
    },
    MuiToolbar: {
      regular: {
        minHeight: "56px !important"
      }
    }
  }
});

const createHighlightItemByAscentType = (ascentType: AscentType) => ({
  color: `${theme.palette.background.default} !important`,
  backgroundColor: `${ascentTypeToColor(ascentType)} !important`,
  "&:hover": {
    backgroundColor: `${ascentTypeToColor(ascentType, Shade.Medium)} !important`
  }
});

export const useStyles = makeStyles(_ => ({
  flexGrow: { flexGrow: 1 },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  dropArea: {
    height: "80px",
    width: "100%",
    minWidth: "300px"
  },
  drawer: { minWidth: "200px" },
  drawerLogoutItemText: { paddingRight: "20px" },
  bottomBar: {
    position: "fixed",
    top: "auto",
    bottom: 0,
    right: 0,
    left: 0,
    textAlign: "center",
    padding: "10px"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  autoSizer: { flexGrow: 1, width: "100% !important" },
  mainActionButton: {
    width: "180px",
    padding: "18px",
    margin: "20px"
  },
  onsight: createHighlightItemByAscentType(AscentType.Onsight),
  flash: createHighlightItemByAscentType(AscentType.Flash),
  redpoint: createHighlightItemByAscentType(AscentType.Redpoint),
  repeat: createHighlightItemByAscentType(AscentType.Repeat)
}));

export const getIconByRouteType = (routeType: RouteType) => {
  switch (routeType) {
    case RouteType.Boulder:
      return <SportsHandball />;
    case RouteType.Sport:
      return <TrendingUp />;
  }
};
