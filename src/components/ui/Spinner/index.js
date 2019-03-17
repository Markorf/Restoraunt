import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./styles";

function CircularIndeterminate() {
  const classes = useStyles();
  return (
    <div>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
}

export default CircularIndeterminate;
