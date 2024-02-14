import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export const themeMain = createMuiTheme({
  palette: {
    primary: {
      main: "#2d3436",
    },
  },
});

export default makeStyles((theme) => ({
  btnfooter: { marginTop: 50 },
  linkovi: {
    color: "inherit",
    textDecoration: "none",
  },
}));
