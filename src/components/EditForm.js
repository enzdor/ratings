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
