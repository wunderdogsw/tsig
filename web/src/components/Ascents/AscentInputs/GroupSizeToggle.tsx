import React from "react";
import { useDispatch } from "react-redux";

import TypeToggle, { ITypeToggle } from "../../common/TypeToggle/TypeToggle";
import { setGroupSize, GroupSizeType } from "../../../ducks/ascentOption";
import useAscentOptions from "../../../hooks/useAscentOptions";

const GroupSizeTypeToggle = TypeToggle as ITypeToggle<GroupSizeType>;

const GroupSizeTypeToggleContainer: React.FC = () => {
  const { groupSize } = useAscentOptions();
  const dispatch = useDispatch();
  return (
    <GroupSizeTypeToggle
      type={groupSize}
      setType={dg => dispatch(setGroupSize(dg))}
      types={Object.values(GroupSizeType)}
    />
  );
};

export default GroupSizeTypeToggleContainer;
