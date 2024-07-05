import React from "react";
import { Container, Grid } from "@mui/material";
import OmHeader from "../../components/elements/OmHeader";
import CustomerForm, { CustomerFormValues } from "./customerForms/CustomerForm";

type NewCustomerPageProps = {};

const NewCustomerPage: React.FC<NewCustomerPageProps> = () => {
  const customer = {} as CustomerFormValues;

  return (
    <Container>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <OmHeader header="New Customer" />
        </Grid>
        <Grid item xs={12}>
          <CustomerForm customer={customer} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewCustomerPage;
