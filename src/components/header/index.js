import React from "react";
import { observer, useObservable } from "mobx-react-lite";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Info from "@material-ui/icons/Info";
import Home from "@material-ui/icons/Home";
import Add from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";
import { MenuItem } from "@material-ui/core";
import restorauntStore from "../../store/restoraunt";
import useStyles from "./styles";

function SearchAppBar({ history }) {
  const rStore = useObservable(restorauntStore);
  const classes = useStyles();
  const {
    location: { pathname }
  } = history;
  const searchHandler = e => {
    const val = e.target.value.toLowerCase();
    rStore.filterText = val;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
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
          <NavLink activeClassName={classes.active} exact to="/add">
            <MenuItem>
              <IconButton color="inherit">
                <Add color="inherit" />
              </IconButton>
              <p className={classes.white}>Add food/drink</p>
            </MenuItem>
          </NavLink>
          <div className={classes.grow} />

          {pathname === "/" && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
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
