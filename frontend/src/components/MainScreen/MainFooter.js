import React from "react";
import useStyles from "../../material-styles/mainstyles";
import "../../sass/mainscreen.scss";
import { Grid, Button, TextField } from "@material-ui/core";
const MainFooter = () => {
  const classes = useStyles();
  return (
    <>
      <div className="mainfooter-div">
        <Grid container className="mainfooter-first">
          <Grid item md={3} xs={6}>
            <div className="mainfooter-div-first">
              <p id="tripselect">TripSelect</p>
              <p id="tripselect-paragraph">
              Welcome to TripSelect, your premier destination for personalized travel experiences.
              </p>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div className="mainfooter-flex-column">
              <div>
                <p>Help</p>
              </div>
              <div className="mainfooter-div-atags">
                <a>FAQs</a>
                <a>Payment</a>
                <a>Transaction</a>
                <a>Return</a>
              </div>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div className="mainfooter-flex-column">
              <div>
                <p>Company</p>
              </div>
              <div className="mainfooter-div-atags">
                <a>About Store</a>
                <a>Contact</a>
                <a>Careers</a>
                <a>Our stuff</a>
              </div>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div className="mainfooter-flex-column">
              <div>
                <p>Newsletter</p>
              </div>
              <div className="mainfooter-newsletter">
                <p id="newsletter-p">
                Be the first to receive updates, special offers, and travel tips from TripSelect.
                </p>
              </div>
              <div>
                <TextField
                  id="filled-basic"
                  label="Enter your mail"
                  variant="filled"
                  fullWidth
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button
                  className={classes.btnfooter}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: 'purple', color: 'white' }}
                >
                  Book a trip!
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
        <hr></hr>

        <Grid container className="mainfooter-grid-last" alignItems="flex-end">
          <Grid item md={4} xs={4}>
            <p>@2024 TripSelect; All rights reserved</p>
          </Grid>
          <Grid item md={4} xs={4}>
            <p>English/USD (US Dollar)</p>
          </Grid>
          <Grid item md={4} xs={4}>
            <p>Accept for: Paypal, MasterCard, Visa</p>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MainFooter;