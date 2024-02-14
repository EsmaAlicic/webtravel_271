import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useStyles from "../material-styles/styles";
import ShoppingCartSharpIcon from "@material-ui/icons/ShoppingCartSharp";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { Container, Drawer, List, ListItem, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { logout } from "../actions/userActions";
import SearchBar from "./SearchBar";
import MenuIcon from "@material-ui/icons/Menu";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [responsive, setResponsive] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const dispatch = useDispatch();
  const classes = useStyles();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setAnchorEl2(null);
    setAnchorEl(null);
  };

  const list = () => (
    <List>
      <ListItem>
        {" "}
        {responsive && (
          <Route
            render={({ history }) => <SearchBar history={history}></SearchBar>}
          />
        )}
      </ListItem>
      <ListItem>
        <Divider></Divider>
        <Link className={classes.linkovi} to="/cart">
          <Button color="inherit" onClick={handleDrawerClose}>
            <AddShoppingCartIcon
              className={classes.btnlogin}
            ></AddShoppingCartIcon>
            Cart
          </Button>
        </Link>
      </ListItem>
      <Divider />
      <ListItem>
        {" "}
        {userInfo && userInfo.isAdmin && (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="admin"
              aria-haspopup="true"
              onClick={handleMenu2}
              color="inherit"
            >
              <AccountCircle />
              <Typography className={classes.headerProfileLink} variant="body2">
                Admin Options
              </Typography>
            </IconButton>
            <Menu
              id="admin"
              anchorEl={anchorEl2}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open2}
              onClose={handleClose2}
              onClick={handleDrawerClose}
            >
              {" "}
              <MenuItem>
                <Link className={classes.linkovi} to="/admin/userlist">
                  Users
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.linkovi} to="/admin/trips">
                  Trips
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={classes.linkovi} to="/admin/orders">
                  Orders
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}
      </ListItem>
      <ListItem>
        {userInfo && (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
              <Typography className={classes.headerProfileLink} variant="body2">
                {userInfo.name}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
              onClick={handleDrawerClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile" className={classes.linkovi}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Log out</MenuItem>
            </Menu>
          </div>
        )}
      </ListItem>
    </List>
  );

  useEffect(() => {
    const makeResponsive = () => {
      return window.innerWidth < 900
        ? setResponsive(true)
        : setResponsive(false);
    };
    makeResponsive();
    window.addEventListener("resize", () => makeResponsive());
    return () => {
      window.removeEventListener("resize", () => makeResponsive());
    };
  }, []);
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Link to="/main" className={classes.linkovi}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <ShoppingCartSharpIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" className={classes.title}>
              TripSelect
            </Typography>
            <Button onClick={handleDrawerOpen}>
              <MenuIcon className={classes.responsiveIcon}></MenuIcon>
            </Button>
            <Drawer
              anchor={"right"}
              open={drawerOpen}
              onClose={handleDrawerClose}
            >
              {list()}
            </Drawer>

            {!userInfo && (
              <Link className={classes.linkovi} to="/login">
                <Button color="inherit">
                  <PermContactCalendarIcon
                    className={classes.btnlogin}
                  ></PermContactCalendarIcon>
                  Login
                </Button>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <div className={classes.headerMargin}></div>
    </>
  );
};

export default Header;
