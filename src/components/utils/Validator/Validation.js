import React, { Fragment } from "react";
import useStyles from "./styles";

function Validation({
  children,
  minLen = 0,
  maxLen = 300,
  minNum = 0,
  maxNum = 300,
  isFormValid,
  validatorObject,
  index
}) {
  const classes = useStyles();
  const inputVal = React.Children.only(children).props.value;
  const isValid =
    minNum && maxNum
      ? Number(inputVal) >= minNum && Number(inputVal) <= maxNum
      : inputVal.length >= minLen && inputVal.length <= maxLen;
  const message = minNum
    ? `Number must be between ${minNum} and ${maxNum}`
    : `This input length must be between ${minLen} and ${maxLen}`;

  validatorObject[index] = {
    isValid
  };

  return (
    <Fragment>
      {children}
      {!isFormValid && !isValid && <p className={classes.message}>{message}</p>}
    </Fragment>
  );
}
Validation.displayName = "Validation";

export default Validation;
