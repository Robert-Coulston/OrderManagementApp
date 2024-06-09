import React from "react";
import * as yup from "yup"; // Add this line to import the 'yup' package
// import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import OmTextField from "../../../components/formsUI/OmTextField";
import OmSelect from "../../../components/formsUI/OmSelect";
import OmSubmitButton from "../../../components/formsUI/OmSubmitButton";
import countries from "../../../data/countries.json";

export interface CustomerFormValues {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
}

interface CustomerFormProps {
  customer: CustomerFormValues;
}

const FORM_VALIDATION: yup.Schema<CustomerFormValues> = yup.object().shape({
  id: yup.number().required("ID is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  contactNumber: yup.string().required("Phone number is required"),
  addressLine1: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
});

const CustomerForm: React.FC<CustomerFormProps> = ({ customer }) => {
  // const [open, setOpen] = React.useState(false);
  // const navigate = useNavigate();

  const INITIAL_FORM_STATE: CustomerFormValues = {
    id: customer.id,
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    email: customer.email || "",
    contactNumber: customer.contactNumber || "",
    addressLine1: customer.addressLine1 || "",
    addressLine2: customer.addressLine2 || "",
    city: customer.city || "",
    state: customer.state || "",
    country: customer.country || "",
  };

  const addOrUpdateCustomer = async (values: CustomerFormValues) => {
    console.log(values);
  };

  return (
    <Container>
      <div>
        <h2>Customer Form</h2>
        <Formik
          onSubmit={addOrUpdateCustomer}
          initialValues={INITIAL_FORM_STATE}
          validationSchema={FORM_VALIDATION}
        >
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <OmTextField
                  name="firstName"
                  otherProps={{ label: "First Name" }}
                />
              </Grid>
              <Grid item xs={6}>
                <OmTextField
                  name="lastName"
                  otherProps={{ label: "Last Name" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField name="email" otherProps={{ label: "Email" }} />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="contactNumber"
                  otherProps={{ label: "Contact Number" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="addressLine1"
                  otherProps={{ label: "Address Line 1" }}
                />
              </Grid>
              <Grid item xs={12}>
                <OmTextField
                  name="addressLine2"
                  otherProps={{ label: "Address Line 2" }}
                />
              </Grid>
              <Grid item xs={6}>
                <OmTextField name="city" otherProps={{ label: "City" }} />
              </Grid>
              <Grid item xs={6}>
                <OmTextField name="state" otherProps={{ label: "State" }} />
              </Grid>
              <Grid item xs={12}>
                <OmSelect
                  name="country"
                  otherProps={{ label: "Country" }}
                  options={countries}
                />
              </Grid>
              <Grid item xs={12}>
                <OmSubmitButton
                otherProps={{}}
                >
                {!customer.id ? "Add Customer" : "Update Customer"}
                </OmSubmitButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default CustomerForm;
