import React from "react";
import {useState} from 'react';
import Router from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import { useLogin } from "../hooks/auth/useLogin";
import { useRegister } from "../hooks/auth/useRegister";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const { user: currentUser } = useCurrentUser();
  if (currentUser) {
    Router.push("genre-classifier");
  }
  
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState(""); 
  const { login } = useLogin();
  const { register } = useRegister();
  
  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter information");
    } else {
      login(username, password)
        .then((res) => Router.push("/genre-classifier"))
        .catch((e) => alert(e));
    }
  }

  const handleRegister = () => {
    if (!username || !password) {
      alert("Please enter information");
    } else {
      register(username, password)
        .then((res) => Router.push("/genre-classifier"))
        .catch((e) => alert(e));
    }
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Genre Finder</h4>
                    <div className={classes.socialLine}>
                      
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Log In </p>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        value: username,
                        onChange: (e) => {setUsername(e.target.value)}
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        value: password,
                        onChange: (e) => {setPassword(e.target.value)}
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button simple color="info" size="lg" onClick={handleRegister}>
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
