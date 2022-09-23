import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import MyRadio from "./MyRadio";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { PostRating } from "../services/ratingServices";
import useToken from "../zustand";
import * as yup from "yup";


const validationSchema = yup.object({
    name: yup.string().required(),
    entry_type: yup.string().required(),
    rating: yup.number().required().min(0).max(10),
    consumed: yup.string().required()
})


function Add() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const token = useToken(state => state.token)
    useEffect(() => {
	if (token === "") {
	    navigate("/")
	}
    }, [token])

    return (
	<Formik
	    initialValues={{name: '', entry_type: '', rating: '', consumed: ''}}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    setSubmitting(true);
		    const result = await PostRating({...values, "user_id": 0}, token);
		    if (result.response) {
			setError(result.response.data.Message)
			setSubmitting(false)
		    } else {
			navigate('/');
			setSubmitting(false);
		    }
		} catch (e) {
		    setError(e);
		}
	    }}
	    validationSchema={validationSchema}
	    enableReinitialize={true}
	>
	    {({ isSubmitting, errors, touched }) => (
		<Form>
		    <Container 
			maxWidth="xs" 
			sx={{
			    display: "flex", 
			    alignItems: "center", 
			    flexDirection: "column", 
			    mt: 1
			}}
		    >
			<Typography variant="h3" sx={{my: 1}}>add</Typography>
			<Typography variant="h6" sx={{my: 1}}>{error}</Typography>
			<Stack sx={{width: "100%"}}>
			    <MyTextField
				id="name"
				name="name"
				label="Name"
			    />
			    <MyTextField
				id="entry_type"
				name="entry_type"
				label="Type"
			    />
			    <MyTextField
				id="rating"
				name="rating"
				label="Rating"
				type="number"
			    />
			    <Typography variant="h6">Consumed:</Typography>
			    <Typography variant="body1" sx={{color: "#d32f2f"}}>{errors.consumed && touched.consumed ? errors.consumed : <></>}</Typography>
			    <MyRadio
				id="true"
				name="consumed"
				value="true"
				label="true"
				type="radio"
			    />
			    <MyRadio
				id="false"
				name="consumed"
				value="false"
				label="false"
				type="radio"
			    />
			    <Button type="submit" variant="contained" disabled={isSubmitting} sx={{my: 3}}>
				Submit
			    </Button>
			</Stack>
		    </Container>
		</Form>
	    )}
	</Formik>
    )
}


export default Add;
