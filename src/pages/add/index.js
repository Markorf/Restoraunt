import React, { useState } from "react";
import { Input, Button, TextField } from "@material-ui/core/";
import { useObservable, observer } from "mobx-react-lite";
import restorauntStore from "../../store/restoraunt";
import optionsStore from "../../store/options";
import Validation from "../../components/validator/Validation";
import Validator from "../../components/validator";
import Modal from "../../components/modal";
import Portal from "../../components/portal";
import SimpleSelect from "../../components/select";
import useStyles from "./styles";

function Add() {
  const classes = useStyles();
  const rStore = useObservable(restorauntStore);
  const oStore = useObservable(optionsStore);
  const [state, setState] = useState({
    name: "",
    price: "",
    description: "",
    src: ""
  });

  const inputHandler = name => e => {
    setState({
      ...state,
      [name]: e.target.value
    });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const res = await rStore.addData(oStore.selectedType, state);
    if (res.message) {
      // ako je doslo do greske
      rStore.showModal(res.message);
    } else {
      rStore.showModal(`${state.name} added to ${oStore.selectedType}!`);
    }
    setState({
      name: "",
      price: "",
      description: "",
      src: "",
      type: oStore.initialType
    });
  };

  return (
    <div className={classes.root}>
      <h1>Add new items to kitchen</h1>
      {rStore.modalInfo.show && (
        <Portal>
          <Modal message={rStore.modalInfo.message}>Message</Modal>
        </Portal>
      )}
      <Validator>
        <form onSubmit={submitHandler}>
          <Validation minLen={3}>
            <Input
              fullWidth
              required
              placeholder="Name"
              value={state.name}
              onChange={inputHandler("name")}
            />
          </Validation>
          <Validation minNum={3}>
            <Input
              fullWidth
              required
              type="number"
              placeholder="Price ($)"
              value={state.price}
              onChange={inputHandler("price")}
            />
          </Validation>
          <Validation minLen={5} maxLen={200}>
            <Input
              fullWidth
              required
              placeholder="Image link"
              value={state.src}
              onChange={inputHandler("src")}
            />
          </Validation>
          <Validation minLen={5}>
            <TextField
              fullWidth
              required
              placeholder="Description"
              value={state.description}
              onChange={inputHandler("description")}
            />
          </Validation>
          <SimpleSelect />
          <Button type="submit" color="primary" variant="contained">
            Add to {oStore.selectedType}
          </Button>
        </form>
      </Validator>
    </div>
  );
}

export default observer(Add);
