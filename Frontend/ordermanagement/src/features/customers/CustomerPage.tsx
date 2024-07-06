import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Customer,
  Order,
  useDeleteCustomerMutation,
  useGetCustomerByIdQuery,
} from "../../graphql/generated/schema";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import CustomerForm from "./customerForms/CustomerForm";
import { CustomerFormValues } from "./customerForms/CustomerForm"; // Import the CustomerFormValues type
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import OmHeader from "../../components/elements/OmHeader";
import OrderList from "../orders/ordersList/OrderList";
import { Delete } from "@mui/icons-material";

type CustomerProps = {};

const CustomerPage: React.FC<CustomerProps> = () => {
  const params = useParams();
  const customerId: number = parseInt(params.customerId ?? "") || 0;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    data: customerData,
    loading: customerLoading,
    error: customerError,
  } = useGetCustomerByIdQuery({
    variables: {
      id: customerId,
    },
  });

  const [
    deleteCustomer,
    { loading: deleteCustomerLoading, error: deleteCustomerError },
  ] = useDeleteCustomerMutation();

  async function deleteCustomerDetails() {
    const response = await deleteCustomer({
      variables: {
        id: customerId,
      },
    });

    if (response.errors) {
      console.error(response.errors);
    }
    navigate("/customers");
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  if (deleteCustomerLoading || customerLoading) return <OmLoading />;

  if (customerError) return <OmAlert message={customerError.message} />;
  if (deleteCustomerError)
    return <OmAlert message={deleteCustomerError.message} />;

  const customer: CustomerFormValues = mapCustomerToFormValues({
    customer: customerData!.customers[0] as Customer,
  });

  const customerOrders = customerData!.customers[0].orders as Order[];

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Customer?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-content">
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteCustomerDetails} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={1}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader header="Customer Details" />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleClickOpen}
            fullWidth={false}
          >
            Delete
          </Button>
        </Grid>
        <Grid item xs={12}>
          <CustomerForm customer={customer} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader header="Orders" />
        </Grid>
        <Grid item xs={12}>
          <OrderList orders={customerOrders} />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth={true}
            color="primary"
            href={`/customers/${customerId}/newOrder`}
          >
            New Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export function mapCustomerToFormValues({
  customer,
}: {
  customer: Customer;
}): CustomerFormValues {
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
