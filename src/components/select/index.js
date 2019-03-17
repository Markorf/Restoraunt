import React, { useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useObservable, observer } from "mobx-react-lite";
import optionsStore from "../../store/options";
import Spinner from "../spinner";
import useStyles from "./styles";

function SimpleSelect({ small = false }) {
  const classes = useStyles();
  const [type, setType] = React.useState("");
  const oStore = useObservable(optionsStore);

  useEffect(() => {
    oStore.getAvailableTypes();
  }, []);

  const handleChange = e => {
    setType(e.target.value);
    oStore.setType(e.target.value);
  };

  const renderMenuItems = () => {
    return oStore.types.map(type => (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    ));
  };

  if (oStore.isLoading) {
    return <Spinner />;
  }

  return (
    <FormControl
      className={
        small
          ? [classes.formControl, classes.small].join(" ")
          : classes.formControl
      }
    >
      <InputLabel htmlFor="type">Select type</InputLabel>
      <Select
        fullWidth
        value={type || oStore.selectedType}
        onChange={handleChange}
        inputProps={{
          id: "type",
          name: "type"
        }}
      >
        {renderMenuItems()}
      </Select>
    </FormControl>
  );
}

export default observer(SimpleSelect);
