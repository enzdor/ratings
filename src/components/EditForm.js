import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import MyRadio from "./MyRadio";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useToken from "../zustand";
import { PatchRating } from "../services/ratingServices";
import { Extend } from "../services/userServices";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string().required(),
    entry_type: yup.string().required(),
    rating: yup.number().required().min(0).max(10),
    consumed: yup.string().required()
})


function EditForm(props) {
    const [error, setError] = useState();
    const token = useToken(state => state.token);
    const setToken = useToken(state => state.setToken);
    const navigate = useNavigate();

    return (
	<Formik
	    initialValues={{
		name: props.item.name, 
		entry_type: props.item.entry_type, 
		rating: props.item.rating, 
		consumed: props.item.consumed
	    }}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    setSubmitting(true);
		    const result = await PatchRating(props.item.rating_id, {...values, user_id: 0}, token);
		    if (result.response) {
			setError(result.response.data.Message)
			setSubmitting(false)
		    } else {
			navigate('/');
			setSubmitting(false);
		    }
		    const newToken = await Extend(token);
		    setToken(newToken);
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
			<Typography variant="h3" sx={{my: 1}}>edit</Typography>
			<Typography variant="h6" sx={{my: 1}}>{error}</Typography>
			<Stack sx={{width: "100%"}}>
			    <MyTextField
				id="name"
				name="name"
				label="Name"
			    />
			    <MyTextField
				id="type"
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

export default EditForm;
