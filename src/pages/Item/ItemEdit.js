import React, { useState, Fragment } from "react";
import { Input, Button, InputLabel } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Validator from "../../components/utils/Validator";
import Validation from "../../components/utils/Validator/Validation";

function ItemEdit({ classes, rStore, setModal }) {
  const [input, setInput] = useState({
    ...rStore.item
  });
  const [touched, setIsTouched] = useState(false);
  const handleChange = name => e => {
    setInput({
      ...input,
      [name]: e.target.value
    });
    setIsTouched(true);
  };

  const submitHandler = async e => {
    e.preventDefault();
    const res = await rStore.editItem(input);
    if (res.message) {
      setModal({
        isOpen: true,
        message: res.message,
        title: "Error"
      });
    } else {
      setModal({
        isOpen: true,
        message: `${rStore.item.name} edited successfully!`,
        title: "Success"
      });
    }
  };

  return (
    <Fragment>
      <Validator>
        <form onSubmit={submitHandler} className={classes.container}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Validation minLen={3}>
            <Input
              required
              value={input.name}
              onChange={handleChange("name")}
            />
          </Validation>
          <InputLabel htmlFor="name">Price</InputLabel>
          <Validation minNum={3}>
            <Input
              id="name"
              required
              type="number"
              value={input.price}
              onChange={handleChange("price")}
            />
          </Validation>
          <InputLabel htmlFor="src">Image link</InputLabel>
          <Validation minLen={5} maxLen={200}>
            <Input
              id="src"
              required
              value={input.src}
              onChange={handleChange("src")}
            />
          </Validation>
          <InputLabel htmlFor="desc">Description</InputLabel>
          <Validation minLen={5}>
            <Input
              required
              id="desc"
              value={input.description}
              onChange={handleChange("description")}
            />
          </Validation>
          <Button
            disabled={!touched}
            className={classes.buttonRoot}
            type="submit"
            variant="contained"
            color="primary"
          >
            SAVE
          </Button>
        </form>
      </Validator>
    </Fragment>
  );
}

export default observer(ItemEdit);
