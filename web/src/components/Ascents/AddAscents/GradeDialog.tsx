import React from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";

import { RouteType } from "../../../types/ascent";

export type Grade = { name: string; value: number };

// TODO: This could be an enum?
export const GRADE_NAMES: Grade[] = [
  { name: "6A", value: 400 },
  { name: "6A+", value: 450 },
  { name: "6B", value: 500 },
  { name: "6B+", value: 550 },
  { name: "6C", value: 600 },
  { name: "6C+", value: 650 },
  { name: "7A", value: 700 },
  { name: "7A+", value: 750 },
  { name: "7B", value: 800 },
  { name: "7B+", value: 850 },
  { name: "7C", value: 900 },
  { name: "7C+", value: 950 },
  { name: "8A", value: 1000 }
];

export const gradeValueToName = (value: number, routeType?: RouteType) => {
  const gradeName =
    GRADE_NAMES.find(grade => grade.value === value)?.name ?? value.toString();
  return routeType === RouteType.Sport ? gradeName.toLowerCase() : gradeName;
};

type GradeDialogProps = {
  handleAddAscent: (grade: Grade) => void;
  open: boolean;
  onClose: () => void;
};

export const GradeDialog: React.FC<GradeDialogProps> = props => {
  const { handleAddAscent, open, onClose } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Choose grade</DialogTitle>
      <List>
        {GRADE_NAMES.map(grade => (
          <ListItem
            button
            onClick={() => handleAddAscent(grade)}
            key={grade.value}
          >
            <ListItemText primary={grade.name}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
