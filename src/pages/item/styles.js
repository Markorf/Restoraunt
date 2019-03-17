import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  item: {
    "& img[alt='thumbnail']": {
      height: 300,
      borderRadius: 10,
      cursor: "zoom-in"
    },
    "& .image-box img[alt='original']": {
      height: 500,
      width: 500
    },
    "& img": {
      cursor: "pointer"
    }
  },
  back: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    color: "#3f51b5",
    "&:hover": {
      color: "red",
      transition: "all .3s ease"
    }
  }
}));
