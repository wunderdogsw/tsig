import React from "react";

import {
  AscentType,
  RouteType,
  ascentTypesByRouteType
} from "../../../types/ascent";
import TypeToggle, { ITypeToggle } from "../../common/TypeToggle/TypeToggle";
import { useStyles } from "../../common/styles";

type AscentTypeToggleProps = {
  routeType: RouteType;
  ascentType: AscentType;
  setAscentType: React.Dispatch<React.SetStateAction<AscentType>>;
};

const AscentTypeToggle = TypeToggle as ITypeToggle<AscentType>;

const AscentTypeToggleContainer: React.FC<AscentTypeToggleProps> = props => {
  const classes = useStyles();
  const types = ascentTypesByRouteType(props.routeType);
  return (
    <AscentTypeToggle
      type={props.ascentType}
      setType={props.setAscentType}
      types={types}
      classes={classes}
    />
  );
};

export default AscentTypeToggleContainer;
