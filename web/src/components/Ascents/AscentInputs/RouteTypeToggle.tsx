import React from "react";

import { RouteType } from "../../../types/ascent";
import TypeToggle, { ITypeToggle } from "../../common/TypeToggle/TypeToggle";
import { getIconByRouteType } from "../../common/styles";
import useAscentOptions from "../../../hooks/useAscentOptions";
import { setRouteType } from "../../../ducks/ascentOption";
import { useDispatch } from "react-redux";

type RouteTypeToggleProps = {
  routeType?: RouteType;
  setRouteType?: React.Dispatch<React.SetStateAction<RouteType>>;
};

const RouteTypeToggle = TypeToggle as ITypeToggle<RouteType>;

const RouteTypeToggleContainer: React.FC<RouteTypeToggleProps> = props => {
  const dispatch = useDispatch();
  const { routeType } = useAscentOptions();

  const type = props.routeType ?? routeType;
  const setType =
    props.setRouteType ?? ((rt: RouteType) => dispatch(setRouteType(rt)));
  return (
    <RouteTypeToggle
      type={type}
      setType={setType}
      types={Object.values(RouteType)}
      getIconByType={getIconByRouteType}
    />
  );
};

export default RouteTypeToggleContainer;
