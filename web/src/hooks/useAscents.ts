import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getLocalAscents } from "../clients/storageClient";
import { RootState } from "../ducks";
import { set } from "../ducks/ascent";

const useAscents = () => {
  const ascents = useSelector((state: RootState) => state.ascents);
  const ascentsAreInInitialState = ascents.ascents.length === 0;

  const dispatch = useDispatch();

  useEffect(() => {
    const getAscentsFromLocalStorage = async () => {
      // TODO: Ascents could be set in an isLoading state here
      const localAscents = await getLocalAscents();
      if (localAscents?.ascents.length > 0) {
        dispatch(set(localAscents.ascents));
      }
    };

    if (ascentsAreInInitialState) {
      getAscentsFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ascents;
};

export default useAscents;
