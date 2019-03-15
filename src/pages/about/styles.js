import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    "& img[alt='thumbnail']": {
      cursor: "zoom-in"
    },

    "& img": {
      cursor: "pointer"
    }
  }
}));
