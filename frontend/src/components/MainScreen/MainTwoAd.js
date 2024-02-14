import React from "react";
import useStyles from "../../material-styles/mainstyles";
import "../../sass/mainscreen.scss";
import { Grid, Button } from "@material-ui/core";
import MainTwoAdFirst from "../../images/main1.jpg";
import MainTwoAdSecond from "../../images/main2.jpg";
const MainTwoAd = () => {
  return (
    <>
      <Grid container>
        <Grid item md={6} xs={12} className="maintwoad-first-part">
          <div className="maintwoad-img-first">
            <img src={MainTwoAdFirst}></img>
          </div>
          
        </Grid>
        <Grid item md={6} xs={12} className="maintwoad-second-part">
          <div className="maintwoad-img-second">
            <img src={MainTwoAdSecond}></img>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default MainTwoAd;
