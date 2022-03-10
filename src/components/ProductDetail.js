import React, { forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetail = (props) => {
  return (
    <Dialog
      onClose={props.handleClose}
      open={props.open}
      TransitionComponent={Transition}
      fullwidth="true"
      maxWidth="lg"
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Product Detail
      </DialogTitle>
      {/* {!props.blockDetail && <Spinner />} */}
    </Dialog>
  );
};

export default ProductDetail;