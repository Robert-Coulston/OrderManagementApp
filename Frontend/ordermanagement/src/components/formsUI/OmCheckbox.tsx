import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React from 'react';

type OmCheckboxProps = {
    name: string;
    label: string;
    legend: string;
    otherProps: any;
};

const OmCheckbox: React.FC<OmCheckboxProps> = ({ name, label, legend, otherProps }) => {

    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);
    
    const handleCheckboxChange = (event: any) => {
        const {checked} = event.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...otherProps,
        ...field,
        onChange: handleCheckboxChange,
        checked: meta.value
    };

    const configFormControl: any = {};

    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
        configFormControl.helperText = meta.error;
    }

    return (
        <FormControl {...configFormControl}>
            <FormLabel component="legend">{legend}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox {...configCheckbox} />}
                    label={label}
                />
            </FormGroup>
        </FormControl>
    );
};

export default OmCheckbox;