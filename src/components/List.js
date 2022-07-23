import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyRadio from "./MyRadio";

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
		initialValues={{ type: '', consumed: ''}}
		validate={values => {
		    const errors = {};
		    if (!values.type) {
			errors.type = "Required";
		    }
		}}
		onSubmit={ async (values, { setSubmitting }) => {
		    try {
			if (values.consumed !== "any") {
			    const q = query(
				collection(db, "banana"), 
				where("uid", "==", googleUser.uid), 
				where("consumed", "==", values.consumed)
			    );
			    const list = await getDocs(q);
			    setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
			    setSubmitting(false);
			} else {
			    const q = query(
				collection(db, "banana"), 
				where("uid", "==", googleUser.uid), 
			    );
			    const list = await getDocs(q);
			    setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
			    setSubmitting(false);
			}
		    } catch (e) {
			setGoogleError(e.message);
			setSubmitting(false);
		    }
		}}
	    >
		{({ isSubmitting }) => (
		    <Form>
			<Field type="text" name="type" />
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
			<MyRadio 
			    id="any"
			    name="consumed"
			    value="any"
			    label="any"
			    type="radio"
			/>
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
