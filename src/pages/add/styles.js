import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    "& form": {
      display: "flex",
      flexDirection: "column",
      width: "60%",
      margin: "auto",
      "& button": {
        marginTop: 5
      }
    }
  }
}));
