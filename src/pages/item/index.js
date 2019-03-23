import React, { Fragment, useState, lazy } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { withRouter, Redirect } from "react-router";
import "react-fancybox/lib/fancybox.css";
import BackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import ButtonView from "../../components/ui/ButtonView";
import withModal from "../../components/utils/withModal";
import useItem from "./useItem";
import ItemView from "./ItemView";
import useStyles from "./styles";
import authStore from "../../store/auth";
const ItemEdit = lazy(() => import("./ItemEdit"));
const ItemDelete = lazy(() => import("./ItemDelete"));

function Food({ match, setModal }) {
  const classes = useStyles();
  const [view, setView] = useState("read");
  const aStore = useObservable(authStore);

  const {
    params: { id }
  } = match;
  const rStore = useItem(id);
  const isItemEmpty = Object.keys(rStore.item).length === 0;

  if (rStore.isLoading || isItemEmpty) return <Spinner />;
  if (!rStore.item) return <Redirect to="/" />;

  const clickHandler = viewName => {
    setView(viewName);
  };
  let SelectedView = null;

  if (view === "read") {
    SelectedView = <ItemView classes={classes} item={rStore.item} />;
  } else if (view === "edit") {
    SelectedView = (
      <ItemEdit classes={classes} rStore={rStore} id={id} setModal={setModal} />
    );
  } else if (view === "delete") {
    SelectedView = (
      <ItemDelete rStore={rStore} setModal={setModal}>
        <ItemView classes={classes} item={rStore.item} />
      </ItemDelete>
    );
  }
  return (
    <Fragment>
      <Link className={classes.back} to="/">
        <BackIcon />
        Go Back
      </Link>
      {SelectedView}
      {aStore.isAuth && <ButtonView view={view} clickHandler={clickHandler} />}
    </Fragment>
  );
}

export default withRouter(withModal(observer(Food)));
