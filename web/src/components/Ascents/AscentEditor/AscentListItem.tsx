import React, { CSSProperties } from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction
} from "@material-ui/core";

import { gradeValueToName } from "../AddAscents/GradeDialog";
import { Ascent } from "../../../types/ascent";
import { useStyles, getIconByRouteType } from "../../common/styles";

type AscentListItemProps = {
  style?: CSSProperties;
  ascent: Ascent;
  setAscent: React.Dispatch<React.SetStateAction<Ascent | null>>;
};

const AscentListItem: React.FC<AscentListItemProps> = props => {
  const { ascent, setAscent, style } = props;

  const classes = useStyles();

  return (
    <ListItem
      button
      onClick={() => setAscent(ascent)}
      ContainerProps={{ style: style }}
    >
      <ListItemAvatar>
        <Avatar className={classes[ascent.ascentType]}>
          {getIconByRouteType(ascent.routeType)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${gradeValueToName(ascent.gradeValue, ascent.routeType)}, ${
          ascent.ascentType
        }, ${ascent.routeType}`}
        secondary={`${ascent.date.toLocaleDateString("fi")}`}
      />
      <ListItemSecondaryAction />
    </ListItem>
  );
};

export default AscentListItem;
