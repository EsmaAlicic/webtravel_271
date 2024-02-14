import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import useStyles from "../material-styles/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import Alert from "@material-ui/lab/Alert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Checkout from "../components/Checkout";
import { USER_UPDATE_RESET } from "../reducer-const/userConst";
import Loader from "../components/Home/Loader";
const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsActive(user.isActive);
      }
    }
  }, [user, successUpdate]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isActive }));
  };

  return (
    <>
      <Container>
        <Link className={classes.linkovi} to="/admin/userlist">
          <Button>Go back</Button>
        </Link>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ExitToAppIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          {loadingUpdate && <Loader></Loader>}
          {errorUpdate && <Alert severity="warning">{errorUpdate}</Alert>}
          {error && (
            <Alert style={{ marginTop: "20px" }} severity="error">
              {error}
            </Alert>
          )}

          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Is Active"
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

export default UserEditScreen;
