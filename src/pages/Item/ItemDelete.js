import React from "react";
import { observer } from "mobx-react-lite";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Modal from "../../components/ui/Modal";

function ItemDelete({ rStore, children, history }) {
  const deleteItem = async () => {
    const res = await rStore.deleteItem(rStore.item);
    if (res.message) {
      // ako je doslo do greske
      rStore.showModal(res.message);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      {rStore.modalInfo.show && (
        <Modal message={rStore.modalInfo.message}>Message</Modal>
      )}
      <h4>Are you sure you want to delete {rStore.item.name}?</h4>
      {children}
      <Button variant="contained" color="secondary" onClick={deleteItem}>
        DELETE {rStore.item.name}
      </Button>
    </div>
  );
}
export default observer(withRouter(ItemDelete));
