import React, { Fragment } from "react";
import Header from "../header";
import Footer from "../footer";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
