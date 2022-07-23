import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteForm from "./DeleteForm";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Delete() {
	const [item, setItem] = useState({});
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	onAuthStateChanged(auth, (user) => {
	    if (!user) {
		setLoading(false);
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
		getGoogleDoc();
	}, [])

	const params = useParams();
	return (
	    <>
		{loading ? <h1>loading</h1> : <DeleteForm item={item} />} 
	    </>
	)
}


export default Delete;
