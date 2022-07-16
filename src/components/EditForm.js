import React from "react";
import { Formik, Form, Field } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function EditForm(props) {
    const navigate = useNavigate();

    return (
	<>
	    <h2>Form</h2>
	    <h3>{props.item.id}</h3>
	    <h3>{props.item.name}</h3>
	    <h3>{props.item.rating}</h3>
	    <h3>{props.item.type}</h3>
	    <Formik
		initialValues={{name: props.item.name, rating: props.item.rating, type: props.item.type}}
		onSubmit={ async (values, { setSubmitting }) => {
		    const itemDoc = doc(db, "banana", props.item.id);
		    await updateDoc(itemDoc, {
			name: values.name,
			rating: values.rating,
			type: values.type
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
			<button type="submit" disabled={isSubmitting}>
			    submit
			</button>
		    </Form>
		)}
	    </Formik>
	</>
    )

}

export default EditForm;
