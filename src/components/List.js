import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";

function List() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [googleUser, setGoogleUser] = useState({});
    const [googleError, setGoogleError] = useState('');
    onAuthStateChanged(auth, (user) => {
	if (!user) {
	    navigate("/")
	} else {
	    setGoogleUser(user);
	}
    })

    return (
	<>
	    <h1>list</h1>
	    <h1>{googleError}</h1>
	    <Formik
		initialValues={{ type: '' }}
		validate={values => {
		    const errors = {};
		    if (!values.type) {
			errors.type = "Required";
		    }
		}}
		onSubmit={ async (values, { setSubmitting }) => {
		    try {
			const q = query(collection(db, values.type), where("uid", "==", googleUser.uid));
			const list = await getDocs(q);
			setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
			setSubmitting(false);
		    } catch (e) {
			setGoogleError(e.message);
			setSubmitting(false);
		    }
		}}
	    >
		{({ isSubmitting }) => (
		    <Form>
			<Field type="text" name="type" />
			<button type="submit" disabled={isSubmitting}>
			    submit
			</button>
		    </Form>
		)}
	    </Formik>
	    <div>
		<h1>here is the list</h1>
		{items.map((item) => (
		    <div key={item.id}>
			<h1>{item.name}</h1>
			<h2>{item.rating}</h2>
			<h3>{item.type}</h3>
			<button onClick={() => {navigate(`/edit/${item.id}`)}}>
			    edit
			</button>
			<button onClick={() => {navigate(`/delete/${item.id}`)}}>
			    delete
			</button>
		    </div>
		))}
	    </div>
	</>
    )
}

export default List;
