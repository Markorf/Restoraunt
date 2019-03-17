import React, { Fragment, useState } from "react";

function Validator({ children }) {
  const [isFormValid, setIsFormValid] = useState(true);
  const formChildren = React.Children.only(children).props.children;
  const validatorObject = {};

  React.Children.forEach(formChildren, (child, index) => {
    const isValidationComponent = child.type.displayName === "Validation";
    if (isValidationComponent) {
      validatorObject[index] = { isValid: false };
    }
  });

  const mappedChildren = React.Children.map(formChildren, (child, index) => {
    const isValidationComponent = child.type.displayName === "Validation";
    return isValidationComponent
      ? React.cloneElement(child, { isFormValid, validatorObject, index })
      : child;
  });

  const submitHandler = e => {
    const validations = Object.keys(validatorObject)
      .map(key => validatorObject[key].isValid)
      .filter(value => value !== true);
    if (validations.length > 0) {
      // ako ima neka greska
      setIsFormValid(false);
      e.preventDefault();
      return;
    }
    setIsFormValid(true);
    children.props.onSubmit(e);
  };

  return (
    <Fragment>
      {React.cloneElement(
        children,
        { onSubmit: submitHandler },
        mappedChildren
      )}
    </Fragment>
  );
}

export default Validator;
