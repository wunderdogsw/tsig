import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Ascent, RouteType } from "../../../types/ascent";
import EditAscentDialog from "./EditAscentDialog";
import { removeAscent } from "../../../services/ascentService";
import useAscents from "../../../hooks/useAscents";
import AscentListItem from "./AscentListItem";
import { useStyles } from "../../common/styles";

type ListProps = {
  routeType?: RouteType;
  ascents?: Ascent[];
  setAscents?: React.Dispatch<React.SetStateAction<Ascent[]>>;
};

const AscentList: React.FC<ListProps> = props => {
  const { routeType } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [selectedAscent, setSelectedAscent] = React.useState<Ascent | null>(
    null
  );

  const handleRemoveAscent = async (ascent: Ascent) => {
    if (props.ascents && props.setAscents) {
      props.setAscents([...ascents.filter(a => a.id !== ascent.id)]);
      return;
    }
    await removeAscent(ascent, dispatch, history);
  };

  const ascents = props.ascents ?? useAscents().ascents;
  const filteredAscents = routeType
    ? ascents.filter(a => a.routeType === routeType)
    : ascents;
  const list =
    filteredAscents.length > 0 ? (
      <AutoSizer className={classes.autoSizer}>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={72}
            itemCount={filteredAscents.length}
            itemData={filteredAscents}
          >
            {(props: ListChildComponentProps) => (
              <AscentListItem
                key={props.index}
                style={{ ...props.style, listStyleType: "none" }}
                ascent={props.data[props.index]}
                setAscent={setSelectedAscent}
              />
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
    ) : (
      <p>No ascents logged.</p>
    );

  return (
    <>
      <div className={`${classes.flexGrow} ${classes.flexColumn}`}>{list}</div>
      {selectedAscent ? (
        <EditAscentDialog
          ascent={selectedAscent}
          setAscent={setSelectedAscent}
          removeAscent={handleRemoveAscent}
        />
      ) : null}
    </>
  );
};

export default AscentList;
