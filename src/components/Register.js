import  React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

function Register(){
    const [googleError, setGoogleError] = useState('');
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
	if (user) {
	    navigate("/")
	} 
    })

	return (
	    <>
		<h1>register</h1>
		<h2>{googleError}</h2>
		<Formik
		    initialValues={{email: '', password: ''}}
		    onSubmit={ async (values, { setSubmitting }) => {
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
		>
		{({ isSubmitting }) => (
		    <Form>
			<Field type="email" name="email" />
			<Field type="password" name="password" />
			<button type="submit" disabled={isSubmitting}>
			    submit
			</button>
		    </Form>
		)}
		</Formik>
	    </>
	)
}

export default Register;
