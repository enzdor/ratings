import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

function Edit() {
	const params = useParams();
	const [item, setItem] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	onAuthStateChanged(auth, (user) => {
	    if (!user) {
		navigate("/")
	    } 
	})

	async function getGoogleDoc() {
		const itemDoc = doc(db, "banana", params.id);
		const newItem = await getDoc(itemDoc);
		setItem({ ...newItem.data(), id: params.id });
		setLoading(false);
	}


	useEffect(() => {
		setLoading(true);
		getGoogleDoc();
	}, [])
	return (
	    <>
		{loading ? <h1>loading</h1> : <EditForm item={item} />}
	    </>
	)

}

export default Edit;
