import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import useStyles from "../material-styles/styles";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { transactionAddress, paymentMethod } = cart;

  cart.itemsPrice = Number(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  ).toFixed(2);
  cart.transactionPrice = cart.itemPrice > 100 ? 0 : 100;
  cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.transactionPrice) + Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        transactionAddress: cart.transactionAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        transactionPrice: cart.transactionPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <>
      <Checkout step1 step2 step3 step4></Checkout>
      <Container>
        <Grid container spacing={5}>
          <Grid item md={7}>
            <List>
              <h2>Transaction</h2>
              <ListItem>
                <p>
                  <strong>Address: </strong>
                  {transactionAddress.address}, {transactionAddress.city},
                  {transactionAddress.postalCode}, {transactionAddress.country}
                </p>
              </ListItem>
              <Divider></Divider>
              <h2>Payment Method</h2>
              <ListItem>
                <p>
                  <strong>Method: </strong>
                  {paymentMethod}
                </p>
              </ListItem>
              <Divider></Divider>
              <h2>Order Items</h2>
              <ListItem>
                <p>
                  <strong>Order Items: </strong>
                  {cart.cartItems.length === 0 ? (
                    <Alert severity="info">Your cart is empty!</Alert>
                  ) : (
                    <List>
                      {cart.cartItems.map((item, index) => {
                        return (
                          <ListItem key={index}>
                            <Grid container>
                              <Grid item md={2}>
                                <Avatar
                                  className={classes.rootAvatar}
                                  src={item.image}
                                  alt={item.name}
                                ></Avatar>
                              </Grid>
                              <Grid item md={6}>
                                <Link
                                  to={`trip/${item.trip}`}
                                  className={classes.linkovi}
                                >
                                  {item.name}
                                </Link>
                              </Grid>
                              <Grid item md={4}>
                                {item.qty} x ${item.price} = $
                                {item.qty * item.price}
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })}
                    </List>
                  )}
                </p>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={4}>
            <Card>
              <List>
                <ListItem>
                  <h2>Order Summary</h2>
                </ListItem>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Items: </Grid>
                    <Grid item>${cart.itemsPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Transaction: </Grid>
                    <Grid item>${cart.transactionPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Tax: </Grid>
                    <Grid item>${cart.taxPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Total: </Grid>
                    <Grid item>${cart.totalPrice}</Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Place Order
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
