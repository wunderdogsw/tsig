import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";

import { login, refreshLogin } from "../../services/authService";
import { fetchAscents } from "../../services/ascentService";
import { addError, addInfo } from "../../ducks/notification";
import { set } from "../../ducks/ascent";
import useUser from "../../hooks/useUser";
import { RouterProps } from "../MainRouter/MainRouter";
import LocalLogin from "./LocalLogin";
import { useStyles } from "../common/styles";

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
export const LOCAL = process.env.REACT_APP_LOCAL;

export type GoogleFailResponse = {
  error: string;
  details: string;
};

const Login: React.FC<RouterProps> = props => {
  props.setTitle("Login");

  const navigate = useHistory().push;
  const dispatch = useDispatch();
  const user = useUser();
  const classes = useStyles();

  const loginAs = async (username: string, idToken: string) => {
    if (user.username === username) {
      await refreshLogin(username, idToken);
      navigate("/ascent/add");
      return;
    }
    try {
      await login(username, idToken, dispatch);
    } catch (error) {
      dispatch(addError(`Unable log in as ${username}.`));
      return;
    }
    const ascents = await fetchAscents();
    dispatch(set(ascents));
    navigate("/ascent/add");
  };

  const handleSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const onlineResponse = response as GoogleLoginResponse;
    const idToken = onlineResponse.getAuthResponse().id_token;
    const profile = onlineResponse.getBasicProfile();
    const name = profile.getName();
    dispatch(addInfo(`Welcome ${name}! Authenticating with backend.`));
    const email = profile.getEmail();
    await loginAs(email, idToken);
  };

  const handleFailure = (error: GoogleFailResponse) => {
    dispatch(addError(`Failed to sign in: ${error.error}`));
  };

  if (LOCAL === "local") {
    return <LocalLogin />;
  }

  return GOOGLE_CLIENT_ID ? (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      className={classes.mainActionButton}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
    />
  ) : (
    <p>Google sign in unavailable.</p>
  );
};

export default Login;
