import React from "react";
import { useDispatch } from "react-redux";

import TypeToggle, { ITypeToggle } from "../../common/TypeToggle/TypeToggle";
import { DateGroupType, setDateGroup } from "../../../ducks/ascentOption";
import useAscentOptions from "../../../hooks/useAscentOptions";

const DateGroupTypeToggle = TypeToggle as ITypeToggle<DateGroupType>;

const DateGroupTypeToggleContainer: React.FC = () => {
  const { dateGroup } = useAscentOptions();
  const dispatch = useDispatch();
  return (
    <DateGroupTypeToggle
      type={dateGroup}
      setType={dg => dispatch(setDateGroup(dg))}
      types={Object.values(DateGroupType)}
    />
  );
};

export default DateGroupTypeToggleContainer;
