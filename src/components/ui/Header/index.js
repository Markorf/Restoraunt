import React, { Fragment } from "react";
import { observer, useObservable } from "mobx-react-lite";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";

import {
  Menu,
  Search,
  Info,
  Home,
  Add,
  AccountCircle,
  PermIdentity,
  PersonPin
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import restorauntStore from "../../../store/restoraunt";
import authStore from "../../../store/auth";
import useStyles from "./styles";

function SearchAppBar({ history }) {
  const rStore = useObservable(restorauntStore);
  const aStore = useObservable(authStore);
  const classes = useStyles();
  const {
    location: { pathname }
  } = history;
  const searchHandler = e => {
    const val = e.target.value.toLowerCase();
    rStore.filterText = val;
  };

  let menuItems = (
    <Fragment>
      <div className={classes.grow} />
      <NavLink activeClassName={classes.active} exact to="/register">
        <MenuItem>
          <IconButton>
            <AccountCircle color="inherit" />
          </IconButton>
          <p className={classes.white}>Register</p>
        </MenuItem>
      </NavLink>
      <NavLink activeClassName={classes.active} exact to="/login">
        <MenuItem>
          <IconButton>
            <PermIdentity color="inherit" />
          </IconButton>
          <p className={classes.white}>Login</p>
        </MenuItem>
      </NavLink>
    </Fragment>
  );

  if (aStore.isAuth) {
    menuItems = (
      <Fragment>
        <NavLink activeClassName={classes.active} exact to="/add">
          <MenuItem>
            <IconButton color="inherit">
              <Add color="inherit" />
            </IconButton>
            <p className={classes.white}>Add food/drink</p>
          </MenuItem>
        </NavLink>
        <div className={classes.grow} />

        <MenuItem onClick={() => aStore.logOut()}>
          <IconButton>
            <PersonPin color="inherit" />
          </IconButton>
          <p className={classes.white}>Logout</p>
        </MenuItem>
      </Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <Menu />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            Restoraunt
          </Typography>
          <NavLink activeClassName={classes.active} exact to="/">
            <MenuItem>
              <IconButton color="inherit">
                <Home color="inherit" />
              </IconButton>
              <p className={classes.white}>Home</p>
            </MenuItem>
          </NavLink>
          <NavLink activeClassName={classes.active} exact to="/about">
            <MenuItem>
              <IconButton color="inherit">
                <Info color="inherit" />
              </IconButton>
              <p className={classes.white}>About us</p>
            </MenuItem>
          </NavLink>
          {menuItems}
          {pathname === "/" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={searchHandler}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default observer(SearchAppBar);
