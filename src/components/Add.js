import React, { useState } from "react";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import MyRadio from "./MyRadio";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as yup from "yup";


const validationSchema = yup.object({
    name: yup.string().required(),
    type: yup.string().required(),
    rating: yup.number().required().min(0).max(10),
    consumed: yup.string().required()
})


function Add() {
    const navigate = useNavigate();
    const [googleError, setGoogleError] = useState('');
    const [googleUser, setGoogleUser] = useState({});
    onAuthStateChanged(auth, (user) => {
	if (!user) {
	    navigate("/");
	} else {
	    setGoogleUser(user);
	}
    })

    return (
	<Formik
	    initialValues={{name: '', type: '', rating: '', consumed: ''}}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    await addDoc(collection(db, "banana"), {
			    name: values.name,
			    type: values.type,
			    rating: values.rating,
			    uid: googleUser.uid,
			    consumed: values.consumed,
		    });
		    navigate('/');
		} catch (e) {
		    setGoogleError(e.message);
		    setSubmitting(false);
		}
	    }}
	    validationSchema={validationSchema}
	    enableReinitialize={true}
	>
	    {({ isSubmitting }) => (
		<Form>
		    <Container 
			maxWidth="xs" 
			sx={{
			    display: "flex", 
			    alignItems: "center", 
			    flexDirection: "column", 
			    mt: 4
			}}
		    >
			<Typography variant="h3" sx={{my: 1}}>add</Typography>
			<Typography variant="h6" sx={{my: 1}}>{googleError}</Typography>
			<Stack sx={{width: "100%"}}>
			    <MyTextField
				id="name"
				name="name"
				label="Name"
			    />
			    <MyTextField
				id="type"
				name="type"
				label="Type"
			    />
			    <MyTextField
				id="rating"
				name="rating"
				label="Rating"
				type="number"
			    />
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
