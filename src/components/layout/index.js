import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

function Layout({ children, ...rest }) {
  return (
    <Fragment>
      <Header {...rest} />
      {children}
      <Footer />
    </Fragment>
  );
}

export default withRouter(Layout);
