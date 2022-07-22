import React from "react";
import { useField } from "formik";
import TextField from "@mui/material/TextField";

const MyTextField = ({ type, label, ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";
    return (
	<TextField 
	    fullWidth
	    required
	    margin="normal"
	    type={type ? type : "input"}
	    label={label}
	    {...field}
	    helperText={errorText}
	    error={!!errorText}
	/>
    )
}

export default MyTextField;
