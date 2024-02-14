import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  ListItem,
  FormControl,
  Button,
  List,
  Avatar,
  Select,
  Divider,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { addToCart, removeFromCart } from "../actions/cartActions";
import useStyles from "../material-styles/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

const CartScreen = ({ match, location, history }) => {
  const tripId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (tripId) {
      dispatch(addToCart(tripId, qty));
    }
  }, [dispatch, tripId, qty]);
  console.log(cartItems);
  const classes = useStyles();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=transaction");
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Alert severity="info">You dont have anything in your cart</Alert>
          ) : (
            <List>
              {cartItems.length !== 0 &&
                cartItems.map((item) => {
                  return (
                    <ListItem key={item.trip} className={classes.listItemFlex}>
                      <Grid container>
                        <Grid item md={2}>
                          <Avatar
                            className={classes.large}
                            src={item.image}
                          ></Avatar>
                        </Grid>
                        <Grid item md={3}>
                          <Link
                            to={`/trip/${item.trip}`}
                            className={classes.linkovi}
                          >
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item md={3}>
                          ${item.price}
                        </Grid>
                        <Grid item md={2}>
                          <FormControl>
                            <Select
                              native
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(item.trip, Number(e.target.value))
                                )
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={2}>
                          <Button
                            onClick={() => removeFromCartHandler(item.trip)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
            </List>
          )}
        </Grid>
        <Grid item md={4}>
          <Card>
            <List>
              <ListItem>
                <h3>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
              </ListItem>
              <ListItem>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListItem>
              <Divider></Divider>
              <ListItem>
                <Link className={classes.linkovi} to="/login?redirect=transaction">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CartScreen;
