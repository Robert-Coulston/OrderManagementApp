import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import OmHeader from "../../components/elements/OmHeader";
import OrderForm, { OrderFormValues } from "./orderForm/OrderForm";

const NewOrderPage: React.FC = () => {
  const params = useParams();
  const customerId = parseInt(params.customerId || "", 0);

  console.log("NewOrderPage Params: ", params);

  const order = {
    customerId: customerId,
  } as OrderFormValues;

  console.log("NewOrderPage: order", order);

  return (
    <Container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <OmHeader header="New Order" />
        </Grid>
        <Grid item xs={12}>
          <OrderForm order={order} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewOrderPage;
