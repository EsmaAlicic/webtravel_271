import React from "react";
import { Container, Grid } from "@material-ui/core";
import useStyles from "../material-styles/styles";

const Footer = () => {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} className={classes.footer}>
            Copyright &copy; TripSelect
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Footer;
