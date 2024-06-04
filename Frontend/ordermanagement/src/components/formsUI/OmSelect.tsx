import { MenuItem, TextField } from "@mui/material";
import { useFormikContext, useField } from "formik";
import React from "react";

type OmSelectProps = {
  name: string;
  options: any;
  otherProps: any;
};

const OmSelect: React.FC<OmSelectProps> = ({ name, options, otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleSelectChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    fullWidth: true,
    variant: "outlined",
    onChange: handleSelectChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default OmSelect;
