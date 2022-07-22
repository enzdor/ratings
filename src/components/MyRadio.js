import React from "react";
import { useField } from "formik";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const MyRadio = ({ label, ...props }) => {
    const [field] = useField(props);
    return <FormControlLabel {...field} control={<Radio />} label={label}/>
}


export default MyRadio;
