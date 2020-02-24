import React from "react";
import { useDispatch } from "react-redux";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";

import { RouteType } from "../../../types/ascent";
import useAscentOptions from "../../../hooks/useAscentOptions";
import {
  setCombineRedpoint,
  setCombineFlash
} from "../../../ducks/ascentOption";

const CombineSwitches: React.FC = () => {
  const { routeType, combineRedpoint, combineFlash } = useAscentOptions();
  const dispatch = useDispatch();

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={combineRedpoint}
              onChange={(_, checked) => dispatch(setCombineRedpoint(checked))}
              value="combineRedpoint"
            />
          }
          label="Combine redpoint and repeat"
        />
        {routeType === RouteType.Boulder ? null : (
          <FormControlLabel
            control={
              <Switch
                checked={combineFlash}
                onChange={(_, checked) => dispatch(setCombineFlash(checked))}
                value="combineFlash"
              />
            }
            label="Combine onsight and flash"
          />
        )}
      </FormGroup>
    </FormControl>
  );
};

export default CombineSwitches;
