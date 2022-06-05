import React from "react";
import Nav from "../Nav/Nav";
import classes from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={classes.layout}>
      <Nav />

      <main className={classes.container}>{children}</main>
    </div>
  );
};

export default Layout;
