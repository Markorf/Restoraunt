import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";

function ButtonView({ view, clickHandler }) {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      {view !== "read" && (
        <Button
          onClick={() => clickHandler("read")}
          color="primary"
          variant="contained"
        >
          View
        </Button>
      )}
      {view !== "edit" && (
        <Button
          onClick={() => clickHandler("edit")}
          color="secondary"
          variant="contained"
        >
          EDIT
        </Button>
      )}
      {view !== "delete" && (
        <Button
          onClick={() => clickHandler("delete")}
          color="default"
          variant="contained"
        >
          DELETE
        </Button>
      )}
    </div>
  );
}

export default ButtonView;
