import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Order,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
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
import OrderForm, { OrderFormValues } from "./orderForm/OrderForm";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import OmHeader from "../../components/elements/OmHeader";
import { Delete } from "@mui/icons-material";

type OrderProps = {};

const OrderPage: React.FC<OrderProps> = () => {
  const params = useParams();
  const orderId: number = parseInt(params.orderId ?? "") || 0;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useGetOrderByIdQuery({
    variables: {
      id: orderId,
    },
  });

  const [
    deleteOrder,
    { loading: deleteOrderLoading, error: deleteOrderError },
  ] = useDeleteOrderMutation();

  async function deleteOrderDetails() {
    const response = await deleteOrder({
      variables: {
        id: orderId,
      },
    });

    if (response.errors) {
      console.error(response.errors);
    }
    navigate(`/customers/${orderData?.orders[0].customerId}`);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  if (orderLoading || deleteOrderLoading) return <OmLoading />;
  if (orderError) return <OmAlert message={orderError.message} />;
  if (deleteOrderError) return <OmAlert message={deleteOrderError.message} />;

  function mapOrderToFormValues({ order }: { order: Order }): OrderFormValues {
    return {
      id: order.id,
      customerId: order.customerId,
      orderDate: order.orderDate,
      description: order.description,
      depositAmount: order.depositAmount,
      totalAmount: order.totalAmount,
      otherNotes: order.otherNotes,
      isDelivery: order.isDelivery,
      status: order.status,
    } as OrderFormValues;
  }

  const order: OrderFormValues = mapOrderToFormValues({
    order: orderData!.orders[0] as Order,
  });

  const customer = orderData!.orders[0].customer;

  return (
    <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Order?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-content">
            Are you sure you want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteOrderDetails} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader
            header={`Order Details: ${customer?.firstName} ${customer?.lastName}`}
          />
          {/* <OmHeader header="Order Details" /> */}
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
          <OrderForm order={order} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;
