import { makeStyles } from "@material-ui/styles";
export default makeStyles(() => ({
  foods: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "90%",
    margin: "auto",
    gridGap: 15,
    "& img[alt='thumbnail']": {
      height: 300,
      width: "100%",
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
  }
}));
