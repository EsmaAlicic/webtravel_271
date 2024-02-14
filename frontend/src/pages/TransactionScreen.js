import React, { useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import useStyles from "../material-styles/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { saveTransactionAddress } from "../actions/cartActions";
import Checkout from "../components/Checkout";
const TransactionScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { transactionAddress } = cart;
  const [address, setAddress] = useState(transactionAddress.address);
  const [city, setCity] = useState(transactionAddress.city);
  const [postalCode, setPostalCode] = useState(transactionAddress.postalCode);
  const [country, setCountry] = useState(transactionAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveTransactionAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  const classes = useStyles();
  return (
    <>
      <Container>
        <Checkout step1 step2></Checkout>
        <h1>Transaction</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Enter Address"
            name="address"
            autoFocus
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            label="Enter City"
            name="city"
            autoFocus
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="postalCode"
            label="Enter Postal Code"
            name="postalCode"
            autoFocus
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="country"
            label="Enter Country"
            name="country"
            autoFocus
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </form>
      </Container>
    </>
  );
};

export default TransactionScreen;
