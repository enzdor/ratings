import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

function Add() {
    const navigate = useNavigate();
    const [googleError, setGoogleError] = useState('');

    return (
	<>
	    <h1>add</h1>
	    <Formik
		initialValues={{name: '', type: '', rating: ''}}
		validate={ values => {
		    const errors = {};
		    if (!values.name) {
			    errors.name = "Required";
		    } else if (!values.type) {
			    errors.type = "Required";
		    } else if (!values.rating) {
			    errors.rating = "Required";
		    }

		    return errors;
		}}
		onSubmit={ async (values, { setSubmitting }) => {
		    try {
			    await addDoc(collection(db, "banana"), {
				    name: values.name,
				    type: values.type,
				    rating: values.rating
			    });
			    navigate('/');
		    } catch (e) {
			    setGoogleError(e.message);
			    setSubmitting(false);
		    }

		}}
	>
		{({ isSubmitting }) => (
		    <Form>
			<h3>{googleError}</h3>
			<Field type="text" name="name"/>
			<ErrorMessage name="name" component="h3" />
			<Field type="text" name="type"/>
			<ErrorMessage name="type" component="h3" />
			<Field type="number" name="rating" max="10" min="0" />
			<ErrorMessage name="rating" component="h3" />
			<button type="submit" disabled={isSubmitting}>
			    submit
			</button>
		    </Form>
		)}	
	    </Formik>
	</>
    )
}


export default Add;
