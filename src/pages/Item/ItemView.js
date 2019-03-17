import React from "react";
import ReactFancyBox from "react-fancybox";
import "react-fancybox/lib/fancybox.css";

function ItemView({ classes, item }) {
  return (
    <div className={classes.item}>
      <h1>{item.name}</h1>
      <ReactFancyBox
        image={item.src}
        thumbnail={item.src}
        alt={`item-${item.id}`}
      />
      <p>
        Price: <strong>(${item.price})</strong>
      </p>
      <strong>Description:</strong>
      <p>{item.description}</p>
    </div>
  );
}

export default ItemView;
