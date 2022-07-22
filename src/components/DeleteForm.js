import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";

function DeleteForm(props) {
    const [isSubmitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
	if (user) {
	    if (user.uid !== props.item.uid) {
		navigate("/");
	    }
	} 
    });

    async function deleteBookGoogle(event){
	event.preventDefault();
	setSubmitting(true);
	const itemDoc = doc(db, "banana", props.item.id);
	await deleteDoc(itemDoc);
	setSubmitting(false);
	navigate("/");
    };

    return (
	<>
	    <h2>are you sure you want to delete {props.item.name} entry</h2>
	    <button type="submit" disabled={isSubmitting} onClick={deleteBookGoogle}>
		delete
	    </button>
	</>
    )
}

export default DeleteForm;
