import React, { useState, Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useObservable, observer } from "mobx-react-lite";
import authStore from "../../store/auth";
import Spinner from "../../components/spinner";
import useStyles from "./styles";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    userAge: "",
    password: "",
    repeatedPassword: ""
  });
  const aStore = useObservable(authStore);

  const classes = useStyles();
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== input.password) {
        return false;
      }
      return true;
    });
  }, [input.repeatedPassword]);
  const handleChange = name => e => {
    const val = e.target.value;

    setInput({
      ...input,
      [name]: val
    });
  };

  const handleSubmit = async () => {
    const res = await aStore.tryRegisterUser(input);
    if (res.message) {
      // aStore.showModal(res.message);
    } else {
      // aStore.showModal("You are now registered");
    }
    setInput({
      username: "",
      email: "",
      userAge: "",
      password: "",
      repeatedPassword: ""
    });
  };

  if (aStore.isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1>Register to our page</h1>

      <ValidatorForm
        className={classes.root}
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label="Username"
          onChange={handleChange("username")}
          name="username"
          value={input.username}
          validators={["required", "matchRegexp:^\\w{3,}$"]}
          errorMessages={["this field is required", "Username is not valid"]}
        />
        <TextValidator
          label="Email"
          onChange={handleChange("email")}
          name="email"
          value={input.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
        <TextValidator
          label="Age"
          type="number"
          onChange={handleChange("userAge")}
          name="Age"
          value={input.userAge}
          validators={["required", "minNumber:3", "maxNumber:130"]}
          errorMessages={[
            "this field is required",
            "Please provide correct age"
          ]}
        />
        <TextValidator
          label="Password"
          type="password"
          onChange={handleChange("password")}
          name="Password"
          value={input.password}
          validators={["required", "matchRegexp:^\\S{5,}$"]}
          errorMessages={[
            "this field is required",
            "Please provide stronger password"
          ]}
        />
        <TextValidator
          label="Repeated password"
          type="password"
          onChange={handleChange("repeatedPassword")}
          name="RepeatedPassword"
          value={input.repeatedPassword}
          validators={["required", "isPasswordMatch"]}
          errorMessages={[
            "this field is required",
            "Your passwords are not matched"
          ]}
        />
        <Button
          className={classes.buttonRoot}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </ValidatorForm>
    </Fragment>
  );
}

export default observer(Register);
