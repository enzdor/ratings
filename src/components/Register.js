import  React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import * as yup from "yup";


const validationSchema = yup.object({
    email: yup.string().email().required(),
	    password: yup.string().min(6).required()
})

function Register(){
    const [googleError, setGoogleError] = useState('');
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
	if (user) {
	    navigate("/")
	} 
    })


    return (
	<Formik 
	    initialValues={{email: '', password: ''}}
	    onSubmit={async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
		    await createUserWithEmailAndPassword(auth, values.email, values.password);
		    setSubmitting(false);
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
			    sx={{display: "flex", 
				alignItems: "center", 
				flexDirection: "column", 
				mt: 4
			    }}
			>
			    <Typography variant="h3" sx={{my: 1}}>register</Typography>
			    <Typography variant="h6" sx={{my: 1}}>{googleError}</Typography>
			    <Stack sx={{width: "100%"}}>
				<MyTextField 
				    id="email"
				    name="email"
				    label="Email"
				/>
				<MyTextField 
				    id="password"
				    name="password"
				    type="password"
				    label="Password"
				/>
				<Button type="submit" disabled={isSubmitting} variant="contained" sx={{my: 3}}>
				    Submit
				</Button>
			    </Stack>
			</Container>
		    </Form>
	    )}
	    </Formik>
	)
}

export default Register;
