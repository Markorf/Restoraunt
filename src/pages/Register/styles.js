import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    margin: "1rem auto",
    "& button": {
      marginTop: 15
    }
  }
}));
