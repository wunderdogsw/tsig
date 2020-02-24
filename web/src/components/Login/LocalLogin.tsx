import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { login, refreshLogin } from "../../services/authService";
import { fetchAscents } from "../../services/ascentService";
import { addError } from "../../ducks/notification";
import { set } from "../../ducks/ascent";
import useUser from "../../hooks/useUser";
import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button
} from "@material-ui/core";

const LocalLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const navigate = useHistory().push;
  const dispatch = useDispatch();
  const user = useUser();

  const handleLogin = async () => {
    if (user.username === username) {
      await refreshLogin(username, "idToken");
      navigate("/ascent/add");
      return;
    }
    try {
      await login(username, "idToken", dispatch);
    } catch (error) {
      dispatch(addError(`Unable log in as ${username}.`));
      return;
    }
    const ascents = await fetchAscents();
    dispatch(set(ascents));
    navigate("/ascent/add");
  };

  return (
    <Card>
      <CardContent>
        <TextField
          id="username"
          label="Username"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setUsername(event.target.value)
          }
          value={username}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleLogin}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default LocalLogin;
