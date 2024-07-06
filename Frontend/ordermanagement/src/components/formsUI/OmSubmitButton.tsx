import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

type OmSubmitButtonProps = {
  children: any;
  otherProps: any;
};

const OmSubmitButton: React.FC<OmSubmitButtonProps> = ({
  children,
  otherProps,
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    console.log("OmSubmitButton:handleSubmit");
    submitForm();
  };

  const configButton = {
    ...otherProps,
    color: "primary",
    variant: "contained",
    fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default OmSubmitButton;
