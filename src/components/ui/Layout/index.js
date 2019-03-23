import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import useStyles from "./styles";

function Layout({ children, ...rest }) {
  const classes = useStyles();
  return (
    <Fragment>
      <Header {...rest} />
      <div className={classes.content}>{children}</div>
      <Footer />
    </Fragment>
  );
}

export default withRouter(Layout);
