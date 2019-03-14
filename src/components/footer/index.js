import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

function Footer({ classes }) {
  return (
    <footer className={classes.root}>
      <p>
        Created by <strong>Marko Medic</strong>
      </p>
    </footer>
  );
}

export default withStyles(styles)(Footer);
