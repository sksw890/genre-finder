import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";

import AudioUpload from "/pages/audio-upload.js";

import styles from "/styles/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Genre Finder"
        rightLinks={<HeaderLinks />}
        fixed
        color="white"
      />


      <div className={classNames(classes.main, classes.mainRaised)}>
        <AudioUpload/>

      </div>
    </div>
  );
}
