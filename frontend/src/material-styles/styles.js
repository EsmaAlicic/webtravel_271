import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#661455",
    },
  },
});

export const themeBread = createMuiTheme({
  palette: {
    primary: blue,
  },
});
export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootAvatar: {
    marginRight: "20px",
  },
  title: {
    flexGrow: 1,
  },
  appbarFont: {
    textTransform: "uppercase",
  },

  headerProfileLink: {
    fontSize: "0.9rem",
    textTransform: "uppercase",
    fontWeight: "430",
    paddingLeft: "10px",
    border: "0",
    margin: "0",
  },
  btnlogin: {
    paddingRight: theme.spacing(1),
  },
  footer: {
    textAlign: "center",
  },
  main: {
    marginBottom: theme.spacing(4),
  },
  headerMargin: {
    marginBottom: theme.spacing(5),
  },
  media: {
    height: 300,
  },
  cardContent: {
    display: "flex",

    justifyContent: "space-between",
  },
  textRating: {
    marginLeft: "15px",
  },
  descContent: {
    height: 210,
  },
  desc: {
    height: "100%",
  },
  linkovi: {
    textDecoration: "none",
    color: "inherit",
  },
  gridImg: {
    width: "100%",
  },
  grid3RatingName: {
    padding: "10px 30px",
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  listItemFlex: {
    display: "flex",
    padding: "20px",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  checkoutNav: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  linkoviBread: {
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
    },
  },
  tableWidth: {
    width: "100%",
  },
  uploadDiv: {
    alignItems: "center",
    display: "flex",

    padding: 0,
    margin: 0,
  },
  inputFile: {
    height: "100%",
    border: 0,
    margin: 0,
    height: "3.36rem",
    width: "300px",
    marginTop: "5px",
  },
  questionSign: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionShowListItem: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "start",
  },
  headerSearch: {
    marginLeft: 7,
    marginRight: 8,
    marginBottom: 6,
    height: 35,
    color: "black",
    backgroundColor: "white",
  },
  paginateColor: {
    marginTop: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  responsiveIcon: {
    color: "white",
  },
}));
