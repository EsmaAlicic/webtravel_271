import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "../material-styles/styles";
import { Link } from "react-router-dom";
const Trip = ({ trip }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.rootCard}>
        <CardActionArea className={classes.cardAction}>
          <Link to={`/trip/${trip._id}`}>
            <CardMedia
              className={classes.media}
              image={trip.image}
              title="Contemplative Reptile"
            />
          </Link>
          <CardContent className={classes.descContent}>
            <Typography gutterBottom variant="h6" component="h4">
              {trip.name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.desc}
            >
              {trip.description}
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography variant="body2" color="textSecondary" component="p">
              {trip.destination}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {trip.category}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default Trip;
