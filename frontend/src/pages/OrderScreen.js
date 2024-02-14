import React, { useState, useEffect } from "react";
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
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import Loader from "../components/Home/Loader";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../reducer-const/orderConst";
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (order) {
    order.itemsPrice = Number(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    ).toFixed(2);
  }

  useEffect(() => {
    const addPaypal = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypal();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver]);
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Alert severity="error">{error}</Alert>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Container>
        <Grid container spacing={5}>
          <Grid item md={7}>
            <List>
              <h2>Transaction</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <ListItem>
                <p>
                  <strong>Address: </strong>
                  {order.transactionAddress.address}, {order.transactionAddress.city},
                  {order.transactionAddress.postalCode},{" "}
                  {order.transactionAddress.country}
                </p>
                {order.isDelivered ? (
                  <Alert severity="info" style={{ marginLeft: "20px" }}>
                    Delivered on {order.deliveredAt}
                  </Alert>
                ) : (
                  <Alert severity="error" style={{ marginLeft: "20px" }}>
                    Not Delivered
                  </Alert>
                )}
              </ListItem>
              <Divider></Divider>
              <h2>Payment Method</h2>
              <ListItem>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Alert severity="info" style={{ marginLeft: "20px" }}>
                    Paid on {order.paidAt}
                  </Alert>
                ) : (
                  <Alert severity="error" style={{ marginLeft: "20px" }}>
                    Not Paid
                  </Alert>
                )}
              </ListItem>
              <Divider></Divider>
              <h2>Order Items</h2>
              <ListItem>
                <p>
                  <strong>Order Items: </strong>
                  {order.orderItems.length === 0 ? (
                    <Alert severity="info">Your order is empty!</Alert>
                  ) : (
                    <List>
                      {order.orderItems.map((item, index) => {
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
                    <Grid item>${order.itemsPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Transaction: </Grid>
                    <Grid item>${order.transactionPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Tax: </Grid>
                    <Grid item>${order.taxPrice}</Grid>
                  </Grid>
                </ListItem>
                <Divider></Divider>
                <ListItem>
                  <Grid container justify="space-between">
                    <Grid item>Total: </Grid>
                    <Grid item>${order.totalPrice}</Grid>
                  </Grid>
                </ListItem>
                {!order.isPaid && (
                  <ListItem>
                    {loadingPay && <Loader></Loader>}
                    {!sdkReady ? (
                      <Loader></Loader>
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </ListItem>
                )}

                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    <Button onClick={deliverHandler}>Mark as delivered!</Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OrderScreen;
