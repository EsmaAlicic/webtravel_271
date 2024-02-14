import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../material-styles/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { listUsers, deleteUser } from "../actions/userActions";
import Loader from "../components/Home/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { success: successOrder, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Alert severity="warning"></Alert>
      ) : (
        <>
          <TableContainer>
            <Table className={classes.tableWidth}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>USER</TableCell>
                  <TableCell>DATE</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAID</TableCell>
                  <TableCell>DELIVERED</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length !== 0 &&
                  orders.map((order) => {
                    return (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.user && order.user.name}</TableCell>
                        <TableCell>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell>${order.totalPrice}</TableCell>
                        <TableCell>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: red }}
                            ></i>
                          )}
                        </TableCell>
                        <TableCell>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: red }}
                            ></i>
                          )}
                        </TableCell>
                        <TableCell>
                          <Link to={`/order/${order._id}`}>
                            <Button variant="contained" color="primary">
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
