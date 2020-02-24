import React, { useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { Box } from "@material-ui/core";

import AscentTable from "./AscentEditor/AscentTable";
import AddAscents from "./AddAscents/AddAscents";
import { RouterProps } from "../MainRouter/MainRouter";
import useAscentOptions from "../../hooks/useAscentOptions";

const AscentRoutes: React.FC<RouterProps> = props => {
  const { setTitle } = props;

  const history = useHistory();
  const { routeType } = useAscentOptions();

  const isAddRoute = Boolean(useRouteMatch("/ascent/add"));
  const isListRoute = Boolean(useRouteMatch("/ascent/list"));

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    if (isAddRoute) {
      setTitle("Add");
      setIndex(0);
    } else if (isListRoute) {
      setTitle("Edit");
      setIndex(1);
    } else {
      setTitle("Ascents");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddRoute, isListRoute]);

  const getPathFromIndex = (i: number) => {
    switch (i) {
      case 0:
        return "/ascent/add";
      case 1:
        return "/ascent/list";
      default:
        return "/ascent";
    }
  };

  const handleSwipeIndex = () => {
    history.push(getPathFromIndex(index));
  };

  const boxProps = {
    width: "calc(100vw - 48px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <>
      <SwipeableViews
        index={index}
        onChangeIndex={setIndex}
        onTransitionEnd={handleSwipeIndex}
        animateHeight
        enableMouseEvents
        ignoreNativeScroll
        style={{}}
        containerStyle={{ width: "calc(100vw - 24px)" }}
        slideStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start"
        }}
      >
        <Box {...boxProps} minHeight="calc(100vh - 56px)">
          <AddAscents key="Add ascents" />
        </Box>
        <Box {...boxProps} height="calc(100vh - 56px)">
          <AscentTable key="Edit ascents" routeType={routeType} />
        </Box>
      </SwipeableViews>
    </>
  );
};

export default AscentRoutes;
