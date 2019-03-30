import React from "react";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";
import aboutImg from "../../assets/images/about.jpg";
import useStyles from "./styles";

function About() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>About page</h2>
      <ReactFancyBox image={aboutImg} thumbnail={aboutImg} alt="about-wp" />
      <div>
        <strong>Few words...</strong>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          animi odio cupiditate voluptas placeat soluta ullam esse aperiam
          deserunt nesciunt. Eos eveniet dolore repudiandae voluptatem dicta
          cupiditate doloremque esse sed.Cupiditate dolorem id maxime alias
          obcaecati fuga recusandae reprehenderit voluptatem, amet qui quo
          distinctio dolorum est doloremque delectus nam. Ullam optio ex
          reprehenderit alias numquam minus incidunt suscipit rerum a!
        </p>
      </div>
    </div>
  );
}

export default About;
