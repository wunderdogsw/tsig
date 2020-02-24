import React from "react";
import { Box } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";

export type TypeToggleContainerProps<T extends string> = {
  type: T;
  setType: (newType: T) => void;
  classes?: Record<T, string>;
};

type TypeToggleProps<T extends string> = TypeToggleContainerProps<T> & {
  types: T[];
  getIconByType?: (t: T) => JSX.Element;
};

export type ITypeToggle<T extends string = any> = React.FC<TypeToggleProps<T>>;

const TypeToggle: ITypeToggle = props => {
  const { type, setType, classes, types, getIconByType } = props;
  return (
    <Box padding="10px 0">
      <ToggleButtonGroup
        value={type}
        exclusive
        onChange={(_, value) => {
          if (!value) return;
          setType(value);
        }}
      >
        {types.map(t => (
          <ToggleButton
            key={t}
            value={t}
            selected={t === type}
            className={classes && t === type ? classes[t] : ""}
          >
            {getIconByType && getIconByType(t)}
            {t}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default TypeToggle;
