import React from "react";
import {
  ListItem,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFormLabel = styled(FormLabel)({
  [`&.MuiFormLabel-root`]: {
    fontWeight: 'bold',
    marginRight: "10px"
  }
});

const DetailRow = ({ title, value }) => {
  return (
    <ListItem>
      <StyledFormLabel>
        {title}
      </StyledFormLabel>
      <FormLabel>
        {value}
      </FormLabel>
    </ListItem>
  );
};

export default DetailRow;
