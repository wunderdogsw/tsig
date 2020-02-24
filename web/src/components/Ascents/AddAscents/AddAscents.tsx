import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Box } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { v4 as uuid } from "uuid";

import {
  AscentType,
  Ascent,
  ascentTypesByRouteType
} from "../../../types/ascent";
import { GradeDialog, Grade } from "./GradeDialog";
import AscentList from "../AscentEditor/AscentList";
import { addAscent } from "../../../services/ascentService";
import { useStyles } from "../../common/styles";
import useAscents from "../../../hooks/useAscents";
import useAscentOptions from "../../../hooks/useAscentOptions";

const AddAscents: React.FC = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [ascentType, setAscentType] = React.useState(AscentType.Redpoint);

  const dispatch = useDispatch();
  const history = useHistory();
  const { routeType } = useAscentOptions();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const todaysAscents = useAscents().ascents.filter(
    a =>
      a.date.getDate() === day &&
      a.date.getMonth() === month &&
      a.date.getFullYear() === year
  );

  const startAddAscent = (newAscentType: AscentType) => {
    setAscentType(newAscentType);
    setOpen(true);
  };

  const handleAddAscent = async (grade: Grade) => {
    const ascent: Ascent = {
      id: uuid(),
      routeType,
      gradeValue: grade.value,
      ascentType,
      date: new Date()
    };
    await addAscent(ascent, dispatch, history);
    setOpen(false);
  };

  return (
    <>
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {ascentTypesByRouteType(routeType).map(ascentType => (
          <Button
            key={ascentType}
            className={`${classes.mainActionButton} ${classes[ascentType]}`}
            onClick={() => startAddAscent(ascentType)}
          >
            <Add />
            {ascentType}
          </Button>
        ))}
      </Box>
      <Box
        flexGrow={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="90vw"
      >
        <AscentList ascents={todaysAscents} />
      </Box>
      <GradeDialog
        handleAddAscent={handleAddAscent}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AddAscents;
