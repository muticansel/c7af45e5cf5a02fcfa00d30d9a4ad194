import React, { forwardRef } from "react";
import { Dialog, DialogTitle, Slide, List } from "@mui/material";
import DetailRow from "./DetailRow";
import { styled } from "@mui/material/styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialogTİtle = styled(DialogTitle)({
  [`&.MuiTypography-root`]: {
    textAlign: 'center'
  }
});

const ProductDetail = ({ productDetail, handleClose, open }) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      TransitionComponent={Transition}
      fullwidth="true"
      maxWidth="lg"
    >
      <StyledDialogTİtle id="simple-dialog-title">
        Product Detail
      </StyledDialogTİtle>
      <List>
        {productDetail && (
          <DetailRow title="Vendor" value={productDetail.vendor} />
        )}
        {productDetail && (
          <DetailRow title="Product Type" value={productDetail.product_type} />
        )}
        {productDetail && (
          <DetailRow
            title="Inventory Management"
            value={productDetail.variants[0].inventory_management}
          />
        )}
      </List>
    </Dialog>
  );
};

export default ProductDetail;
