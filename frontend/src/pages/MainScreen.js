import React from "react";
import { Container, Grid, Button } from "@material-ui/core";
import useStyles from "../material-styles/mainstyles";
import MainHeader from "../components/MainScreen/MainHeader";
import MainHero from "../components/MainScreen/MainHero";
import MainExp from "../components/MainScreen/MainExp";
import MainAd from "../components/MainScreen/MainAd";
import MainTwoAd from "../components/MainScreen/MainTwoAd";
import MainDescription from "../components/MainScreen/MainDescription";
import MainFooter from "../components/MainScreen/MainFooter";
const MainScreen = () => {
  const classes = useStyles();
  return (
    <>
      <MainHeader></MainHeader>
      <Container>
        <MainHero></MainHero>
        <MainExp></MainExp>
      </Container>
      <MainAd></MainAd>
      <MainTwoAd></MainTwoAd>
      <MainDescription></MainDescription>
      <MainFooter></MainFooter>
    </>
  );
};

export default MainScreen;
