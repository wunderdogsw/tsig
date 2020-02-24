import { useSelector } from "react-redux";

import { RootState } from "../ducks";

const useNotifications = () =>
  useSelector((state: RootState) => state.notifications);

export default useNotifications;
