import React from "react";
import useStyles from "../../material-styles/mainstyles";
import "../../sass/mainscreen.scss";
import { Grid, Button } from "@material-ui/core";
import Booking from "../../images/booking.png";
import Loupe from "../../images/loupe.png";
import Security from "../../images/security.png";
import Reward from "../../images/reward.png";
const MainDescription = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className="maindesc-row">
        <Grid item md={3} xs={6}>
          <div className="maindesc-first">
            <img src={Loupe}></img>
            <p>Discover Your Dream Destination!</p>
          </div>
          <div className="maindesc-div">
            <p>
              {" "}
              Explore our vast selection of destinations and find your perfect getaway. 
            </p>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="maindesc-second">
            <img src={Booking}></img>
            <p>Book Your Adventure Today!</p>
          </div>
          <div className="maindesc-div">
            <p>
            Plan your next unforgettable journey with ease.
            </p>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="maindesc-third">
            <img src={Reward}></img>
            <p>Earn Exciting Travel Rewards!</p>
          </div>
          <div className="maindesc-div">
            <p>
              {" "}
              Get rewarded for your wanderlust with our exclusive travel perks. 
            </p>
          </div>
        </Grid>
        <Grid item md={3} xs={6}>
          <div className="maindesc-fourth">
            <img src={Security}></img>
            <p>Secure Booking, Peace of Mind!</p>
          </div>
          <div className="maindesc-div">
            <p>
              {" "}
              Rest assured with our secure booking platform.
            </p>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default MainDescription;