import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import MyRadio from "./MyRadio";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as yup from "yup";


const validationSchema = yup.object({
    name: yup.string().required(),
    type: yup.string().required(),
    rating: yup.number().required().min(0).max(10),
    consumed: yup.string().required()
})


function EditForm(props) {
    const [googleError, setGoogleError] = useState();
    const [googleUser, setGoogleUser] = useState({});
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
	if (user) {
	    if (user.uid !== props.item.uid) {
	    }
	    setGoogleUser(user);
	} 
    })
	/*
	<>
	    <h2>Form</h2>
	    <h3>{props.item.id}</h3>
	    <h3>{props.item.name}</h3>
	    <h3>{props.item.rating}</h3>
	    <h3>{props.item.type}</h3>
	    <Formik
		initialValues={{name: props.item.name, rating: props.item.rating, type: props.item.type, consumed: props.item.consumed}}
		validate={ values => {
		    const errors = {};
		    if (!values.name) {
			    errors.name = "Required";
		    } else if (!values.type) {
			    errors.type = "Required";
		    } else if (!values.rating) {
			    errors.rating = "Required";
		    } else if (!values.consumed) {
			    errors.rating = "Required";
		    }

		    return errors;
		}}
		onSubmit={ async (values, { setSubmitting }) => {
		    const itemDoc = doc(db, "banana", props.item.id);
		    await updateDoc(itemDoc, {
			name: values.name,
			rating: values.rating,
			type: values.type,
			uid: googleUser.uid,
			consumed: values.consumed
		    })
		    setSubmitting(false);
		    navigate("/");
		}}
		enableReinitialize={true}
	    >
		{({ isSubmitting }) => (
		    <Form>
			<Field type="text" name="name" />
			<Field type="number" name="rating" />
			<Field type="text" name="type" />
			<label>
			    true
			    <Field type="radio" name="consumed" value="true" />
			</label>
			<label>
			    false
			    <Field type="radio" name="consumed" value="false" />
			</label>
			<button type="submit" disabled={isSubmitting}>
			    submit
			</button>
		    </Form>
		)}
	    </Formik>
	</>
	*/

    return (
	<Formik
	    initialValues={{
		name: props.item.name, 
		type: props.item.type, 
		rating: props.item.rating, 
		consumed: props.item.consumed
	    }}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    const itemDoc = doc(db, "banana", props.item.id);
		    await updateDoc(itemDoc, {
			name: values.name,
			rating: values.rating,
			type: values.type,
			uid: googleUser.uid,
			consumed: values.consumed
		    })
		    setSubmitting(false);
		    navigate("/");
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
			<Typography variant="h3" sx={{my: 1}}>edit</Typography>
			<Typography variant="h6" sx={{my: 1}}>{googleError}</Typography>
			<Stack>
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

export default EditForm;
