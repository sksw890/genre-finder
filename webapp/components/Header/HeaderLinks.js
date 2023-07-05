/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import Explore from "@material-ui/icons/Explore";
import Email from "@material-ui/icons/Email";

// core components
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import { useLogout } from "../../hooks/auth/useLogout";
import { useRouter } from "next/router";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const router = useRouter()
  const { logout } = useLogout();
  
  const handleSignout = (e) => {
    e.preventDefault();
    logout();
    router.push("/login");
  }

  const handleFind = (e) => {
    e.preventDefault();
    router.push("/genre-classifier");
  }

  const handleResult = (e) => {
    e.preventDefault();
    router.push("/results");
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink + " " + classes.navLinkActive}
          onClick={(e) => handleFind(e)}
          color="transparent"
        >
          <Explore className={classes.icons} /> Find
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink}
          onClick={(e) => handleResult(e)}
          color="transparent"
        >
          <Email className={classes.icons} /> Results
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#pablo"
          className={classes.navLink}
          onClick={(e) => handleSignout(e)}
          color="transparent"
        >
          <AccountCircle className={classes.icons} /> Log Out
        </Button>
      </ListItem>
    </List>
  );
}
