import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  NativeSelect,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useMediaQuery,
  Box,
  Theme
} from "@material-ui/core";
import DateUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { Delete, Save, Cancel } from "@material-ui/icons";

import { Ascent } from "../../../types/ascent";
import { GRADE_NAMES } from "../AddAscents/GradeDialog";
import RouteTypeToggle from "../AscentInputs/RouteTypeToggle";
import AscentTypeToggle from "../AscentInputs/AscentTypeToggle";
import { editAscent } from "../../../services/ascentService";

type EditAscentDialogProps = {
  ascent: Ascent;
  setAscent: React.Dispatch<React.SetStateAction<Ascent | null>>;
  removeAscent: (ascent: Ascent) => Promise<void>;
};

const EditAscentDialog: React.FC<EditAscentDialogProps> = props => {
  const { ascent, setAscent, removeAscent } = props;

  const [routeType, setRouteType] = useState(ascent.routeType);
  const [ascentType, setAscentType] = useState(ascent.ascentType);
  const [gradeValue, setGradeValue] = useState(ascent.gradeValue);
  const [date, setDate] = useState(ascent.date);

  const isXsScreen = useMediaQuery((t: Theme) => t.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const history = useHistory();

  const onSaveClick = async () => {
    const editedAscent: Ascent = {
      ...ascent,
      routeType,
      ascentType,
      gradeValue,
      date
    };
    const id = editedAscent.id;
    await editAscent(id, editedAscent, dispatch, history);
    setAscent(null);
  };

  const dialogContent = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <RouteTypeToggle routeType={routeType} setRouteType={setRouteType} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateUtils}>
          <KeyboardDatePicker
            id={"date"}
            format={"YYYY-MM-DD"}
            value={date}
            onChange={event => (event ? setDate(event.toDate()) : null)}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={8}>
        <AscentTypeToggle
          routeType={routeType}
          ascentType={ascentType}
          setAscentType={setAscentType}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NativeSelect
          value={gradeValue}
          onChange={event => setGradeValue(Number.parseInt(event.target.value))}
        >
          {GRADE_NAMES.map(grade => (
            <option key={grade.value} value={grade.value}>
              {grade.name}
            </option>
          ))}
        </NativeSelect>
      </Grid>
    </Grid>
  );

  return (
    <Dialog onClose={() => setAscent(null)} open={true} fullScreen={isXsScreen}>
      <DialogTitle>Edit ascent</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            await removeAscent(ascent);
            setAscent(null);
          }}
          endIcon={<Delete />}
        >
          Remove
        </Button>
        <Box flex={1}></Box>
        <Button
          variant="contained"
          color="default"
          onClick={() => setAscent(null)}
          endIcon={<Cancel />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          autoFocus
          onClick={onSaveClick}
          endIcon={<Save />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAscentDialog;
