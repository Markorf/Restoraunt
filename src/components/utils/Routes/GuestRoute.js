import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useObservable, observer } from "mobx-react-lite";
import authStore from "../../../store/auth";

function GuestRoute(props) {
  const aStore = useObservable(authStore);
  if (aStore.isAuth) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
}

export default observer(GuestRoute);
