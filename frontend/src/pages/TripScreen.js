import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Button,
  Divider,
  FormControl,
  Select,
  TextField,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import useStyles from "../material-styles/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  listTripDetails,
  createTripQuestion,
  deleteQuestionById,
} from "../actions/tripActions";
import { useDispatch, useSelector } from "react-redux";
import {
  TRIP_CREATE_QUESTION_RESET,
  QUESTION_DELETE_RESET,
} from "../reducer-const/tripConst";
import Alert from "@material-ui/lab/Alert";
const TripScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const tripDetailList = useSelector((state) => state.tripDetails);
  const { trip } = tripDetailList;

  const tripQuestionCreate = useSelector((state) => state.tripQuestionCreate);
  const { error: errorQuestion, success: successTripQuestion } =
    tripQuestionCreate;

  const tripQuestionDelete = useSelector((state) => state.tripQuestionDelete);
  const { success: successDeleteTripQuestion } = tripQuestionDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successTripQuestion) {
      setComment("");
      dispatch({ type: TRIP_CREATE_QUESTION_RESET });
    }
    if (successDeleteTripQuestion) {
      setComment("");
      dispatch({ type: QUESTION_DELETE_RESET });
    }
    dispatch(listTripDetails(match.params.id));
  }, [match, dispatch, successTripQuestion, successDeleteTripQuestion]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const deleteHandler = (id, questionId) => {
    dispatch(deleteQuestionById(id, questionId));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTripQuestion(match.params.id, { comment }));
  };
  const classes = useStyles();
  return (
    <>
      <>
        <Link to="/" className={classes.linkovi}>
          <Button color="primary">Go Back</Button>
        </Link>
        <Grid container>
          <Grid item md={6}>
            <img
              src={trip.image}
              alt={trip.name}
              fluid
              className={classes.gridImg}
            ></img>
          </Grid>
          <Grid item md={3} className={classes.grid3RatingName}>
            <List>
              <ListItem>
                <h3>{trip.name}</h3>
              </ListItem>
              <Divider></Divider>
              <Divider></Divider>
              <ListItem>Price: ${trip.price}</ListItem>
              <Divider></Divider>
              <ListItem>{trip.description}</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardActionArea className={classes.cardCart}>
                <List>
                  <ListItem>
                    <Grid container alignItems="space-around">
                      <Grid item xs={9} md={9}>
                        Price:
                      </Grid>
                      <Grid item>${trip.price}</Grid>
                    </Grid>
                  </ListItem>
                  <Divider></Divider>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={9} md={9}>
                        Status:
                      </Grid>
                      <Grid item>
                        {trip.countInStock === 0 ? (
                          <strong>Out of stock</strong>
                        ) : (
                          <strong>In Stock</strong>
                        )}
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider></Divider>
                  {trip.countInStock > 0 && (
                    <ListItem>
                      <Grid container>
                        <Grid item xs={9} md={9}>
                          Qty:
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <Select
                              native
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(trip.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {" "}
                                  {x + 1}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </ListItem>
                  )}
                  <Divider></Divider>
                  <ListItem>
                    <Button
                      onClick={addToCartHandler}
                      variant="contained"
                      color="primary"
                      fullWidth="true"
                      disabled={trip.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListItem>
                </List>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6}>
            <h2>Questions</h2>
            {trip.questions.length === 0 && (
              <Alert severity="info">No questions</Alert>
            )}
            <List>
              {trip.questions.map((question) => {
                return (
                  <ListItem
                    className={classes.questionShowListItem}
                    key={question._id}
                  >
                    <strong>{question.name}</strong>
                    <span>{question.createdAt.substring(0, 10)}</span>
                    <span>{question.comment}</span>
                    {userInfo && userInfo.isAdmin ? (
                      <Button
                        variant="contained"
                        onClick={() => deleteHandler(trip._id, question._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    ) : null}
                  </ListItem>
                );
              })}
              <ListItem className={classes.questionSign}>
                <h2>Ask something...</h2>
                {errorQuestion && (
                  <Alert severity="warning">{errorQuestion}</Alert>
                )}
                {userInfo ? (
                  <form className={classes.form} onSubmit={submitHandler}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="comment"
                      label="Ask something..."
                      type="textarea"
                      rows="3"
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                ) : (
                  <Alert severity="info">
                    Please sign in to ask a question!
                  </Alert>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default TripScreen;
