import React from "react";
import {
  OrderModelInput,
  Scalars,
  Status,
  useAddOrUpdateOrderMutation,
} from "../../../graphql/generated/schema";
import * as yup from "yup"; // Import the 'yup' package
import { formatDatePicker } from "../../../utils/DateFormatter";
import { Alert, Container, Grid, Snackbar } from "@mui/material";
import { Form, Formik } from "formik";
import OmSelect from "../../../components/formsUI/OmSelect";
import OmDatePicker from "../../../components/formsUI/OmDatePicker";
import OmTextField from "../../../components/formsUI/OmTextField";
import OmCheckbox from "../../../components/formsUI/OmCheckbox";
import OmSubmitButton from "../../../components/formsUI/OmSubmitButton";
import statuses from "../../../data/statuses.json";
import { useNavigate } from "react-router-dom";
import OmLoading from "../../../components/elements/OmLoading";

export interface OrderFormValues {
  id?: number;
  customerId: number;
  // email: string;
  orderDate: Scalars["DateTime"];
  description: string;
  depositAmount: number;
  otherNotes?: string;
  totalAmount: number;
  isDelivery: boolean;
  status: Status;
}

interface OrderFormProps {
  order: OrderFormValues;
}

const OrderForm: React.FC<OrderFormProps> = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const FORM_VALIDATION: yup.Schema<OrderFormValues> = yup.object().shape({
    id: yup.number(),
    customerId: yup.number().required("Customer is required"),
    orderDate: yup.date().required("Order Date is required"),
    description: yup.string().required("Description is required"),
    depositAmount: yup.number().required("Deposit Amount is required"),
    // email: yup
    //   .string()
    //   .email("Invalid email address")
    //   .required("Email is required"),
    otherNotes: yup.string(),
    totalAmount: yup.number().required("Total Amount is required"),
    isDelivery: yup.boolean().required("Delivery is required"),
    status: yup
      .mixed<Status>()
      .oneOf(Object.values(Status), "Invalid status")
      .required("Status is required"),
  });

  const INITIAL_FORM_STATE: OrderFormValues = {
    id: order.id,
    customerId: order.customerId,
    // email: order.email || "",
    orderDate: formatDatePicker(order.orderDate || new Date()),
    description: order.description || "",
    depositAmount: order.depositAmount || 0,
    totalAmount: order.totalAmount || 0,
    otherNotes: order.otherNotes || "",
    isDelivery: order.isDelivery || false,
    status: order.status || Status.Draft,
  };

  const handleClose = (event: any) => {
    if (event?.reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [
    addOrUpdateOrder,
    { loading: addOrUpdateOrderLoading, error: addOrUpdateOrderError },
  ] = useAddOrUpdateOrderMutation();

  const mapOrderFormValuesToOrderModelInput = (
    values: OrderFormValues
  ): OrderModelInput => {
    const orderModel: OrderModelInput = {
      id: values.id,
      customerId: values.customerId,
      // email: values.email,
      orderDate: values.orderDate,
      description: values.description,
      depositAmount: values.depositAmount,
      otherNotes: values.otherNotes,
      totalAmount: values.totalAmount,
      isDelivery: values.isDelivery,
      status: values.status,
    };
    return orderModel;
  };

  const addOrUpdateOrderDetails = async (values: OrderFormValues) => {
    const orderModelInput = mapOrderFormValuesToOrderModelInput(values);
    const response = await addOrUpdateOrder({
      variables: { orderModel: orderModelInput },
    });
    setOpen(true);

    const order = response.data?.addOrUpdateOrder;
    if (order?.id) {
      navigate(`/orders/${order.id}`);
    }
  };
  if (addOrUpdateOrderLoading) {
    return (
      <>
        <OmLoading />
      </>
    );
  }

  if (addOrUpdateOrderError) {
    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={addOrUpdateOrderError.message}
      >
        <Alert severity="error">{addOrUpdateOrderError.message}</Alert>
      </Snackbar>
    );
  }

  return (
    <Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }}>
          {order.id
            ? "Order updated successfully"
            : "Order added successfully"}
        </Alert>
      </Snackbar>
      <div>
        <h2>Order Form</h2>
        <Formik
          onSubmit={addOrUpdateOrderDetails}
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OmSelect
                  name="status"
                  otherProps={{ label: "Order Status" }}
                  options={statuses}
                />
              </Grid>
              <Grid item xs={12}>
                <OmDatePicker
                  name="orderDate"
                  otherProps={{ label: "Order Date" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="description"
                  otherProps={{ label: "Description" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="otherNotes"
                  otherProps={{
                    label: "Other Notes",
                    multiline: true,
                    rows: 4,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="totalAmount"
                  otherProps={{ label: "Total Amount", type: "number"}}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="depositAmount"
                  otherProps={{ label: "Deposit Amount", type: "number"}}
                />
              </Grid>
              <Grid item xs={12}>
                <OmCheckbox
                  name="isDelivery"
                  legend="Include delivery"
                  label="Include delivery"
                  otherProps={{ label: "Deposit Included" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmSubmitButton otherProps={{}}>
                  {!order.id ? "Add Order" : "Update Order"}
                </OmSubmitButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default OrderForm;
