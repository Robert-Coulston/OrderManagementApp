import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

interface OmDatePickerProps {
    // Define the props for your component here
    name: string;
    otherProps: any;
}

const OmDatePicker: React.FC<OmDatePickerProps> = ({name, otherProps}) => {
    // Implement your component logic here
    const [field, meta] = useField(name);

    const configDatePicker = {
        ...field,
        ...otherProps,
        type: 'date',
        fullWidth: true,
        variant: 'outlined',
        inputLabelProps: {shrink: true}
    };

    if (meta && meta.touched && meta.error) {
        configDatePicker.error = true;
        configDatePicker.helperText = meta.error;
    }


    return (
        <TextField {...configDatePicker} />
    );
};

export default OmDatePicker;