import React, { useState } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import useStyles from "../material-styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { transactionAddress } = cart;

  if (!transactionAddress) {
    history.push("/transaction");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  const classes = useStyles();
  return (
    <>
      <Container>
        <Checkout step1 step2 step3></Checkout>
        <h1>Payment Method</h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid item md={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup aria-label="paymentMethod" name="paymentMethod">
                <FormControlLabel
                  value="PayPal"
                  control={<Radio />}
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            {" "}
            <Button variant="contained" color="primary" type="submit">
              Continue
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default PaymentScreen;
