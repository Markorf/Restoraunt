import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import useStyles from "./styles";

function Layout({ children, history }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Header history={history} />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Fragment>
  );
}

export default withRouter(Layout);
