import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order, useGetOrderByIdQuery } from "../../graphql/generated/schema";
import { Container, Grid } from "@mui/material";
import OrderForm, { OrderFormValues } from "./orderForm/OrderForm";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import OmHeader from "../../components/elements/OmHeader";

type OrderProps = {};

const OrderPage: React.FC<OrderProps> = () => {
  const params = useParams();
  const orderId: number = parseInt(params.orderId ?? "") || 0;
  //   const navigate = useNavigate();

  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useGetOrderByIdQuery({
    variables: {
      id: orderId,
    },
  });

  if (orderLoading) return <OmLoading />;
  if (orderError) return <OmAlert message={orderError.message} />;

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

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader header="Order Details" />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={12}>
          <OrderForm order={order} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderPage;
