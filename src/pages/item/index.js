import React, { useEffect } from "react";
import { useObservable, observer } from "mobx-react-lite";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import BackIcon from "@material-ui/icons/ArrowBack";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import Spinner from "../../components/spinner";
import restorauntStore from "../../store/restoraunt";
import useStyles from "./styles";

function Food({ match }) {
  const classes = useStyles();
  const rStore = useObservable(restorauntStore);
  const {
    params: { id }
  } = match;
  useEffect(() => {
    rStore.getItem(id);
    // mora () => jer ce biti problem pri redirektu
    return () => (rStore.item = {});
  }, [id]);

  if (rStore.isLoading) return <Spinner />;
  if (!rStore.item) return <Redirect to="/" />;
  return (
    <div className={classes.item}>
      <Link className={classes.back} to="/">
        <BackIcon />
        Go Back
      </Link>
      <h1>{rStore.item.name}</h1>
      <ReactFancyBox
        image={rStore.item.src}
        thumbnail={rStore.item.src}
        alt={`item-${rStore.item.id}`}
      />

      <strong>Description:</strong>
      <p>{rStore.item.description}</p>
    </div>
  );
}

export default withRouter(observer(Food));
