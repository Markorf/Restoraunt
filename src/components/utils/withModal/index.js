import React, { Fragment, useState } from "react";
import Portal from "../Portal";
import Modal from "../../ui/Modal";

const withModal = WrappedComponent =>
  function(props) {
    const [modal, setModal] = useState({
      isOpen: false,
      message: "",
      title: ""
    });
    return (
      <Fragment>
        {modal.isOpen && (
          <Portal>
            <Modal title={modal.title}>{modal.message}</Modal>
          </Portal>
        )}
        <WrappedComponent setModal={setModal} {...props} />
      </Fragment>
    );
  };
export default withModal;
