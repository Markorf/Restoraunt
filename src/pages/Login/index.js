import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useObservable, observer } from "mobx-react-lite";
import authStore from "../../store/auth";
import Spinner from "../../components/spinner";
import useStyles from "./styles";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const aStore = useObservable(authStore);

  const classes = useStyles();

  const handleChange = name => e => {
    const val = e.target.value;

    setInput({
      ...input,
      [name]: val
    });
  };

  const handleSubmit = async () => {
    await aStore.tryAuthUser(input);

    setInput({
      email: "",
      password: ""
    });
  };

  if (aStore.isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1>Login to our page</h1>

      <ValidatorForm
        className={classes.root}
        onSubmit={handleSubmit}
        onError={errors => console.log(errors)}
      >
        <TextValidator
          label="Email"
          onChange={handleChange("email")}
          name="email"
          value={input.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
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

        <Button
          className={classes.buttonRoot}
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </ValidatorForm>
    </Fragment>
  );
}

export default observer(Login);
