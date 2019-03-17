import React, { useState, Fragment } from "react";
import { Input, Button, InputLabel } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import Validator from "../../components/utils/Validator";
import Validation from "../../components/utils/Validator/Validation";
import Modal from "../../components/ui/Modal";

function ItemEdit({ classes, rStore }) {
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
      // ako je doslo do greske
      rStore.showModal(res.message);
    } else {
      rStore.showModal(`${input.name} edited!`);
    }
  };

  return (
    <Fragment>
      {rStore.modalInfo.show && (
        <Modal message={rStore.modalInfo.message}>Message</Modal>
      )}
      <Validator>
        <form onSubmit={submitHandler} className={classes.container}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Validation minLen={3}>
            <Input
              required
              id="component-simple"
              value={input.name}
              onChange={handleChange("name")}
            />
          </Validation>
          <InputLabel htmlFor="component-helper">Price</InputLabel>
          <Validation minNum={3}>
            <Input
              required
              type="number"
              id="component-helper"
              value={input.price}
              onChange={handleChange("price")}
            />
          </Validation>
          <InputLabel htmlFor="component-helper">Image link</InputLabel>
          <Validation minLen={5} maxLen={200}>
            <Input
              required
              id="component-helper"
              value={input.src}
              onChange={handleChange("src")}
            />
          </Validation>
          <InputLabel htmlFor="component-helper">Description</InputLabel>
          <Validation minLen={5}>
            <Input
              required
              id="component-helper"
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
