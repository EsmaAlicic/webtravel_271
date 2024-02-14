import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import useStyles from "../material-styles/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listTripDetails } from "../actions/tripActions";
import Alert from "@material-ui/lab/Alert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Loader from "../components/Home/Loader";
import { updateTrip } from "../actions/tripActions";
import { TRIP_UPDATE_RESET } from "../reducer-const/tripConst";
import axios from "axios";
const TripEditScreen = ({ match, history }) => {
  const tripId = match.params.id;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const tripDetails = useSelector((state) => state.tripDetails);
  const { error, trip, loading } = tripDetails;

  const tripUpdate = useSelector((state) => state.tripUpdate);
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = tripUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TRIP_UPDATE_RESET });
      history.push("/admin/trips");
    } else {
      if (!trip.name || trip._id !== tripId) {
        dispatch(listTripDetails(tripId));
      } else {
        setName(trip.name);
        setPrice(trip.price);
        setImage(trip.image);
        setDestination(trip.destination);
        setCategory(trip.category);
        setCountInStock(trip.countInStock);
        setDescription(trip.description);
      }
    }
  }, [trip, history, dispatch, dispatch, tripId, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTrip({
        _id: tripId,
        name,
        price,
        image,
        destination,
        category,
        description,
        countInStock,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(`/${data}`);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  return (
    <>
      <Container>
        <Link className={classes.linkovi} to="/admin/trips">
          <Button>Go back</Button>
        </Link>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ExitToAppIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Trip
            {loadingUpdate && <Loader></Loader>}
            {errorUpdate && <Alert severity="warning">{errorUpdate}</Alert>}
          </Typography>
          {loading && <Loader></Loader>}
          {error && <Alert severity="warning">{error}</Alert>}

          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name of Trip"
              name="name"
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              autoFocus
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className={classes.uploadDiv}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="image"
                label="Enter Image Url"
                name="image"
                autoFocus
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Button
                variant="contained"
                className={classes.inputFile}
                component="label"
              >
                Upload file
                <input type="file" hidden onChange={uploadFileHandler}></input>
                {uploading && <Loader></Loader>}
              </Button>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="destination"
              label="destination"
              name="Destination"
              autoFocus
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="CountInStock"
              label="Count In Stock"
              name="CountInStock"
              autoFocus
              type="number"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              autoFocus
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoFocus
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submitHandler}
            >
              Update
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default TripEditScreen;
