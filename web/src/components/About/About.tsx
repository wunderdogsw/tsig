import React from "react";

import { RouterProps } from "../MainRouter/MainRouter";

const COMMIT_HASH = process.env.REACT_APP_COMMIT_HASH;

const About: React.FC<RouterProps> = props => {
  props.setTitle("About");
  return (
    <>
      <p>Commit hash: {COMMIT_HASH}</p>
    </>
  );
};

export default About;
