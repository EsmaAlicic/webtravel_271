import React from "react";
import useStyles from "../../material-styles/mainstyles";
import "../../sass/mainscreen.scss";
import { Grid, Button } from "@material-ui/core";
import MainAdImg from "../../images/mainAdd1.jpg";
const MainAd = () => {
  return (
    <>
      <Grid container className="mainad-container">
        <Grid item md={12} xs={12} className="mainad-grid-row">
          <div className="mainad-div-img">
            <img src={MainAdImg}></img>
          </div>
          <div className="mainad-paragraph">
            <h2>Pack Your Bags!</h2>
            <p>
                Don't wait any longer – seize the moment and embark on your next journey now!
            </p>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default MainAd;
