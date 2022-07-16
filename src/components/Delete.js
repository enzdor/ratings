import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteForm from "./DeleteForm";
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Delete() {
	const [item, setItem] = useState({});
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
	}


	useEffect(() => {
		getGoogleDoc();
	}, [])

	const params = useParams();
	return (
		<>
			<h1>delete</h1>
			<DeleteForm item={item} />
		</>
	)
}


export default Delete;
