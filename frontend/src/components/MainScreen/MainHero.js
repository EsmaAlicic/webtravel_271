import React from "react";
import "../../sass/mainscreen.scss";
import { Grid, Button } from "@material-ui/core";
import MainHeroImg from "../../images/turizam.jpg";
import useStyles from "../../material-styles/mainstyles";
import { Link } from "react-router-dom";
const MainHero = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        className="main-grid"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item md={15} xs={15}>
          <div className="main-hero-first-paragraph">
            <p>Welcome to Trip Select! <br/> Start your adventure with us!</p>
          </div>
          <div className="main-hero-second-paragraph">
            <h2>TripSelect</h2>
            <p>
              Your gateway to endless journeys is open. Find the perfect destination, 
              explore the world through our wide range of offerings, and create 
              unforgettable moments. From exotic beaches to historical cities, 
              from luxurious getaways to adventurous travels, we enable you to choose 
              your ideal journey.              
            </p>
          </div>
          <div style={{ width: '50%', textAlign: 'center', margin: '20px' }}>
          <Link className={classes.linkovi} to="/main">
            <Button
              className={classes.btnColor}
              variant="outlined"
              color="primary"
              style={{ backgroundColor: 'purple', color: 'white' }}
            >
              Book a trip!
            </Button>
          </Link>
        </div>

        </Grid>
      </Grid>

      <div className="main-hero-img-div">
        <img className="mainheroimg" src={MainHeroImg}></img>
      </div>
      <svg>
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id="mainherosvg">
            <path
              class="cls-1"
              d="M0,0V.66H0C0,.85.23,1,.5,1S1,.84,1,.65H1V0Z"
            />
            <path d="M1,0H0V.66H0C0,.85.23,1,.5,1S1,.84,1,.65H1V0Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default MainHero;