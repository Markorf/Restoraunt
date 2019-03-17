import { makeStyles } from "@material-ui/styles";
export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  small: {
    width: "20%",
    margin: "1rem !important"
  }
}));
