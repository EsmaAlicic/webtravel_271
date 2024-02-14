import React from "react";
import useStyles from "../../material-styles/mainstyles";
import "../../sass/mainscreen.scss";
import { Grid, Button } from "@material-ui/core";
import MainExpImg from "../../images/avion.jpg";
import { Link } from "react-router-dom";
const MainExp = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className="mainexp-container">
        <Grid item md={6} xs={12}>
          <div className="mainexp-div-img">
            <img src={MainExpImg}></img>
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className="mainexp-title">
            <p></p>
            <h2>Unlock Your Dream Adventure with TripSelect!</h2>
          </div>
          <div className="mainexp-description">
            <p>
            TripSelect - your ultimate destination for exploring, planning, 
            and booking unforgettable journeys around the globe! Through our app, 
            travel becomes seamless, exciting, and entirely tailored to your desires. 
            Whether you're seeking a romantic getaway, an adventurous escape, or a 
            family adventure, we empower you to create the perfect trip tailored to 
            your preferences. With a rich selection of destinations, accommodations, 
            activities, and exclusive offers, TripSelect is your partner in discovering 
            the world. Embark on an unforgettable journey with us and create memories that 
            will last a lifetime!
            </p>
          </div>
          <Link className={classes.linkovi} to="/main">
            <Button variant="outlined" style={{ color: 'purple', borderColor: 'purple' }}>
              Book a trip!
            </Button>
          </Link>
        </Grid>
      </Grid>
      {/*SVG Clip Path*/}
      <svg>
        <defs></defs>
        <clipPath clipPathUnits="objectBoundingBox" id="mainexpsvg">
          <path
            class="cls-1"
            d="M1,.22C1,.1.78,0,.5,0S0,.1,0,.22V.77H0C0,.9.22,1,.5,1S1,.9,1,.78H1Z"
          />
          <path d="M.5,0C.22,0,0,.1,0,.22V.77H0C0,.9.22,1,.5,1S1,.9,1,.78H1V.22C1,.1.78,0,.5,0Z" />
        </clipPath>
      </svg>
    </>
  );
};

export default MainExp;
