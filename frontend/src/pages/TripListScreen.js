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
import { deleteTripById, listTrips, createTrip } from "../actions/tripActions";
import Loader from "../components/Home/Loader";
import { TRIP_CREATE_RESET } from "../reducer-const/tripConst";
import Paginate from "../components/Paginate";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

const TripListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const classes = useStyles();
  const tripList = useSelector((state) => state.tripList);
  const { trips, loading, error, page, pages } = tripList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tripCreate = useSelector((state) => state.tripCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    trip: createdTrip,
  } = tripCreate;
  const tripDelete = useSelector((state) => state.tripDelete);
  const { success: successDeleteTrip } = tripDelete;

  useEffect(() => {
    dispatch({ type: TRIP_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/trip/${createdTrip._id}/edit`);
    } else {
      dispatch(listTrips("", pageNumber));
    }
  }, [
    dispatch,
    history,
    successDeleteTrip,
    userInfo,
    successCreate,
    createdTrip,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteTripById(id));
  };
  const createTripHandler = () => {
    dispatch(createTrip());
  };
  return (
    <>
      <Container>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <h1>Trips</h1>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              m={3}
              onClick={createTripHandler}
            >
              Create Trip
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <Loader></Loader>
        ) : error ? (
          <Alert severity="warning"></Alert>
        ) : (
          <>
            <TableContainer fullWidth>
              <Table className={classes.tableWidth}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>NAME</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell>CATEGORY</TableCell>
                    <TableCell>DESTINATION</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trips.length !== 0 &&
                    trips.map((trip) => {
                      return (
                        <TableRow key={trip._id}>
                          <TableCell>{trip._id}</TableCell>
                          <TableCell>{trip.name}</TableCell>
                          <TableCell>${trip.price}</TableCell>
                          <TableCell>{trip.category}</TableCell>
                          <TableCell>{trip.destination}</TableCell>
                          <TableCell>
                            <Link to={`/admin/trip/${trip._id}/edit`}>
                              <Button variant="contained" color="primary">
                                <i className="fas fa-edit"></i>
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              onClick={() => deleteHandler(trip._id)}
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
        <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
      </Container>
    </>
  );
};

export default TripListScreen;
