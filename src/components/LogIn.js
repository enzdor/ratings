import  React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Formik, Form, Field, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Login, Logout } from "../services/userServices";
import { GetRatingById } from "../services/ratingServices";
import useToken from "../zustand";
import * as yup from "yup";


const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
})


function LogIn(){
    const [googleError, setGoogleError] = useState('');
    const navigate = useNavigate();
    const token = useToken(state => state.token)
    const setToken = useToken(state => state.setToken)
    onAuthStateChanged(auth, (user) => {
	if (user) {
	    navigate("/")
	} 
    })

    return (
	<Formik 
	    initialValues={{email: '', password: ''}}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    setSubmitting(true);
		    let result = await Login(values);
		    setToken(result.data)
		    setSubmitting(false);
		} catch (e) {
		    console.log(e)
		}
	    }}
	    /*
	    onSubmit={async (values, { setSubmitting }) => {
		setSubmitting(true);
		try {
		    await signInWithEmailAndPassword(auth, values.email, values.password);
		    setSubmitting(false);
		    navigate('/');
		} catch (e) {
		    setGoogleError(e.message);
		    setSubmitting(false);
		}
	    }}
	    */
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
				mt: 1
			    }}
			>
			    <Typography variant="h3" sx={{my: 1}}>log in</Typography>
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
				<Button variant="contained" sx={{my: 3}} onClick={() => Logout()}>
				    Logout
				</Button>
				<Button variant="contained" sx={{my: 3}} onClick={() => (GetRatingById(22, token))}>
				    Hello
				</Button>
			    </Stack>
			</Container>
		    </Form>
	    )}
	    </Formik>
    )
}

export default LogIn;
