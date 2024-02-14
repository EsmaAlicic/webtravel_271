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
const UserScreenList = ({ history }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const createUserHandler = () => {
    history.push(`/register`);
  };
  return (
    <>
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <h1>Users</h1>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              m={3}
              onClick={createUserHandler}
            >
              Create User
            </Button>
          </Grid>
        </Grid>
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
                    <TableCell>NAME</TableCell>
                    <TableCell>EMAIL</TableCell>
                    <TableCell>ADMIN</TableCell>
                    <TableCell>ACTIVE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length !== 0 &&
                    users.map((user) => {
                      return (
                        <TableRow key={user._id}>
                          <TableCell>{user._id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {user.isAdmin ? (
                              <i
                                className="fas fa-check"
                                style={{ color: green }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: red }}
                              ></i>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.isActive ? (
                              <i
                                className="fas fa-check"
                                style={{ color: green }}
                              ></i>
                            ) : (
                              <i
                                className="fas fa-times"
                                style={{ color: red }}
                              ></i>
                            )}
                          </TableCell>
                          <TableCell>
                            <Link to={`/admin/user/${user._id}/edit`}>
                              <Button variant="contained" color="primary">
                                <i className="fas fa-edit"></i>
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              onClick={() => deleteHandler(user._id)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </>
  );
};

export default UserScreenList;
