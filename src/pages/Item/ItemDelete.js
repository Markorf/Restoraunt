import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

function ItemDelete({ rStore, setModal, history, children }) {
  const deleteItem = async () => {
    const res = await rStore.deleteItem(rStore.item);
    if (res.message) {
      setModal({
        isOpen: true,
        message: res.message,
        title: "Error"
      });
    } else {
      setModal({
        isOpen: true,
        message: `${rStore.item.name} deleted successfully!`,
        title: "Success"
      });
    }
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };
  return (
    <div>
      <h4>Are you sure you want to delete {rStore.item.name}?</h4>
      {children}
      <Button variant="contained" color="secondary" onClick={deleteItem}>
        DELETE {rStore.item.name}
      </Button>
    </div>
  );
}
export default withRouter(ItemDelete);
