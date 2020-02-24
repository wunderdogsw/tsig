import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getLocalUser } from "../clients/storageClient";
import { RootState } from "../ducks";
import { login } from "../ducks/user";

const useUser = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserFromLocalStorage = async () => {
      const localUser = await getLocalUser();

      if (localUser?.username) {
        dispatch(login(localUser.username));
      }
    };

    if (user.username === undefined) {
      fetchUserFromLocalStorage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};

export default useUser;
