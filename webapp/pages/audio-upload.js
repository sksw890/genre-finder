import React from "react";
import Router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {DropzoneArea} from 'material-ui-dropzone'

import { useCurrentUser } from "../hooks/auth/useCurrentUser";

import styles from "/styles/jss/nextjs-material-kit/pages/audioUploadStyle.js";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const useStyles = makeStyles(styles);

export default function AudioUpload() {
  const classes = useStyles();
  const { user: currentUser } = useCurrentUser();

  const handleDropZoneAreaOnChange = (loadedFiles) => {
    if (loadedFiles.length == 1) {
        const formData = new FormData();
        formData.append("audioFile", loadedFiles[0]);
        fetch('http://localhost:3001/app/classify_genre', {
            method: 'POST',
            headers: getAuthorizationHeader(),
            body: formData,
        })
        .then(response => {})
        .then(success => {})
        .catch(error => console.log(error));
        Router.push("/results");
    }
  }

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        <div className={classes.title}>
          <h2>Upload Audio</h2>
        </div>
        <div id="upload_audio">
          <DropzoneArea
            onChange={handleDropZoneAreaOnChange}
            filesLimit={1}
          />
        </div>
      </div>
    </div>
  );
}
