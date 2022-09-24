import  React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Login } from "../services/userServices";
import useToken from "../zustand";
import * as yup from "yup";


const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
})

function LogIn(){
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = useToken(state => state.token)
    const setToken = useToken(state => state.setToken)
    useEffect(() => {
	if (token !== "") {
	    navigate("/")
	}
    }, [token])

    return (
	<Formik 
	    initialValues={{email: '', password: ''}}
	    onSubmit={async (values, { setSubmitting }) => {
		try {
		    setSubmitting(true);
		    const result = await Login(values);
		    if (result.response) {
			setError(result.response.data.Message)
			setSubmitting(false)
		    } else {
			setToken(result.data)
			setSubmitting(false);
		    }
		} catch (e) {
		    setError(e.message);
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
				mt: 1
			    }}
			>
			    <Typography variant="h3" sx={{my: 1}}>log in</Typography>
			    <Typography variant="h6" sx={{my: 1}}>{error}</Typography>
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

export default LogIn;
