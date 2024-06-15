import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Customer,
  Order,
  useGetCustomerByIdQuery,
} from "../../graphql/generated/schema";
import { Container, Grid } from "@mui/material";
import CustomerForm from "./customerForms/CustomerForm";
import { CustomerFormValues } from "./customerForms/CustomerForm"; // Import the CustomerFormValues type
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import OmHeader from "../../components/elements/OmHeader";
import OrderList from "../orders/ordersList/OrderList";

type CustomerProps = {};

const CustomerPage: React.FC<CustomerProps> = () => {
  const params = useParams();
  const customerId: number = parseInt(params.customerId ?? "") || 0;
  //   const navigate = useNavigate();

  const {
    data: customerData,
    loading: customerLoading,
    error: customerError,
  } = useGetCustomerByIdQuery({
    variables: {
      id: customerId,
    },
  });

  if (customerLoading) return <OmLoading />;
  if (customerError) return <OmAlert message={customerError.message} />;

  const customer: CustomerFormValues = mapCustomerToFormValues(
    { customer: customerData!.customers[0] as Customer }  );

  const customerOrders = customerData!.customers[0].orders as Order[];


  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader header="Customer Details" />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={12}>
          <CustomerForm customer={customer} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={12}>
          <OrderList orders={customerOrders} />
        </Grid>
      </Grid>
    </Container>
  );
};

export function mapCustomerToFormValues({ customer }: { customer: Customer; }): CustomerFormValues {
  return {
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    contactNumber: customer.contactNumber,
    addressLine1: customer.address?.addressLine1,
    addressLine2: customer.address?.addressLine2,
    city: customer.address?.city,
    state: customer.address?.state,
    country: customer.address?.country,
  } as CustomerFormValues;
}


export default CustomerPage;
