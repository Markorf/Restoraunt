import React from "react";
import useStyles from "./styles";

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <p>
        Created by <strong>Marko Medic</strong>
      </p>
    </footer>
  );
}

export default Footer;
