import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useStyles from "../material-styles/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { ThemeProvider } from "@material-ui/core/styles";
import { themeBread } from "../material-styles/styles";
import { Typography } from "@material-ui/core";
const Checkout = ({ step1, step2, step3, step4 }) => {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={themeBread}>
        <Breadcrumbs className={classes.checkoutNav}>
          {step1 ? (
            <Link color="primary" href="/login">
              Sign In
            </Link>
          ) : (
            <Link className={classes.linkoviBread} disabled>
              Sign in
            </Link>
          )}
          {step2 ? (
            <Link color="primary" href="/transaction">
              Transaction
            </Link>
          ) : (
            <Link className={classes.linkoviBread} disabled>
              Transaction
            </Link>
          )}
          {step3 ? (
            <Link color="primary" href="/payment">
              Payment
            </Link>
          ) : (
            <Link className={classes.linkoviBread} disabled>
              Payment
            </Link>
          )}
          {step4 ? (
            <Link color="primary" href="/placeorder">
              Place Order
            </Link>
          ) : (
            <Link className={classes.linkoviBread} disabled>
              Place Order
            </Link>
          )}
        </Breadcrumbs>
      </ThemeProvider>
    </>
  );
};

export default Checkout;
