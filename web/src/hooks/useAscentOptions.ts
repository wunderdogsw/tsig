import { useSelector } from "react-redux";

import { RootState } from "../ducks";

const useAscentOptions = () =>
  useSelector((state: RootState) => state.ascentOptions);

export default useAscentOptions;
