import React from "react";
import classNames from "classnames";
import { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomLinearProgress from "/components/CustomLinearProgress/CustomLinearProgress.js";
import styles from "/styles/jss/nextjs-material-kit/pages/components.js";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

const useStyles = makeStyles(styles);

export default function Results () {
  const classes = useStyles();
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
 
  useEffect( () => {
    
    const fetchData = function () {
        return fetch('http://localhost:3001/app', {
            method: 'GET',
            headers: getAuthorizationHeader(),
        })
    }

    // Display loading state when we initially fetch data.
    setLoading(true);
    fetchData().then( data => {
        return data.json();
    }).then(data => {
        setLoading(false);
        setData(data);
    });

    const interval = setInterval(async () => {
        fetchData().then( data => {
            return data.json();
        }).then(data => {
            setData(data);
        });
    }, 1000);


    return () => {
        clearInterval(interval);
    };
  },[]);

  const clean_status = function(status) {
    status = status.replace("_", " ");
    status = status.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    return status;
  }

  const calculate_progess = function(status) {
    if (status == "UPLOADING_AUDIO"){
        return 20
    }
    else if (status == "LOADING_MODEL"){
        return 40
    }
    else if (status == "EXTRACTING_FEATURE"){
        return 60
    }
    else if (status == "PREDICTING_GENRE"){
        return 80
    }
    else if (status == "COMPLETE"){
        return 100
    }
  }
 
  return (
    <div>
      <Header
        brand="Genre Finder"
        rightLinks={<HeaderLinks />}
        fixed
        color="white"
      />


        <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.sections}>
                <div className={classes.container}>
                    <div className={classes.title}>
                    <h2>Results</h2>
                    </div>
                    <div id="result_table">
                    {isLoading && 
                        <GridContainer justify="center">
                            <CircularProgress />
                        </GridContainer>
                    }
                    <GridContainer>
                        <GridItem xs={3} sm={3} md={3}>
                            <div className={classes.title}>
                                <h4>File Name</h4>
                            </div>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                            <div className={classes.title}>
                                <h4>Progress</h4>
                            </div>
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                            <div className={classes.title}>
                                <h4>Status</h4>
                            </div>
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                            <div className={classes.title}>
                                <h4>Result</h4>
                            </div>
                        </GridItem>
                    </GridContainer>

                    {data?.genreClassificationTasks.map(task => (
                        <GridContainer>
                        <GridItem xs={3} sm={3} md={3}>
                            <div>
                                <p>{task.fileName}</p>
                            </div>
                        </GridItem>
                        <GridItem xs={5} sm={5} md={5}>
                            <CustomLinearProgress
                                variant="determinate"
                                color="primary"
                                value={calculate_progess(task.status)}
                            />
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                            <div>
                                <p>{clean_status(task.status)}</p>
                            </div>
                        </GridItem>
                        <GridItem xs={2} sm={2} md={2}>
                            <div>
                                <p>{task.result}</p>
                            </div>
                        </GridItem>
                    </GridContainer>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
 