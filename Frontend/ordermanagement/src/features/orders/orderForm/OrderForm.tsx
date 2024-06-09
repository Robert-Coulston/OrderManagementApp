import React from "react";
import { Scalars, Status } from "../../../graphql/generated/schema";
import * as yup from "yup"; // Import the 'yup' package
import { formatDatePicker } from "../../../utlls/DateFormatter";
import { Container, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import OmSelect from "../../../components/formsUI/OmSelect";
import OmDatePicker from "../../../components/formsUI/OmDatePicker";
import OmTextField from "../../../components/formsUI/OmTextField";
import OmCheckbox from "../../../components/formsUI/OmCheckbox";
import OmSubmitButton from "../../../components/formsUI/OmSubmitButton";

export interface OrderFormValues {
  id?: number;
  customerId?: number;
  email: string;
  orderDate: Scalars["DateTime"];
  description: string;
  depositAmount: number;
  otherNotes?: string;
  totalAmount?: number;
  isDelivery?: boolean;
  status: Status;
}

interface OrderFormProps {
  order: OrderFormValues;
}

const OrderForm: React.FC<OrderFormProps> = ({ order }) => {
  const FORM_VALIDATION: yup.Schema<OrderFormValues> = yup.object().shape({
    id: yup.number(),
    customerId: yup.number(),
    orderDate: yup.date().required("Order Date is required"),
    description: yup.string().required("Description is required"),
    depositAmount: yup.number().required("Deposit Amount is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    otherNotes: yup.string(),
    totalAmount: yup.number(),
    isDelivery: yup.boolean(),
    status: yup
      .mixed<Status>()
      .oneOf(Object.values(Status), "Invalid status")
      .required("Status is required"),
  });

  const INITIAL_FORM_STATE: OrderFormValues = {
    id: order.id,
    customerId: order.customerId,
    email: order.email || "",
    orderDate: formatDatePicker(order.orderDate || new Date()),
    description: order.description || "",
    depositAmount: order.depositAmount || 0,
    totalAmount: order.totalAmount || 0,
    otherNotes: order.otherNotes || "",
    isDelivery: order.isDelivery || false,
    status: order.status || Status.Draft,
  };

  const addOrUpdateOrder = async (values: OrderFormValues) => {
    console.log(values);
  };

  return (
    <Container>
      <div>
        <h2>Order Form</h2>
        <Formik
          onSubmit={addOrUpdateOrder}
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <OmSelect
                  name="status"
                  otherProps={{ label: "Order Status" }}
                  options={Status}
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
                  otherProps={{ label: "Other Notes" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="totalAmount"
                  otherProps={{ label: "Total Amount" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="depositAmount"
                  otherProps={{ label: "Deposit Amount" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmCheckbox
                  name="delivery"
                  legend="Include delivery"
                  label="Include delivery"
                  otherProps={{ label: "Deposit Included" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmSubmitButton
                otherProps={{}}
                >
                {!order.id ? "Add Order" : "Update Orders"}
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
