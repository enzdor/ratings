import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm"; 
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";

function Edit() {
	const params = useParams();
	const [item, setItem] = useState({});

	async function getGoogleDoc() {
		const itemDoc = doc(db, "banana", params.id);
		const newItem = await getDoc(itemDoc);
		setItem({ ...newItem.data(), id: params.id });
	}


	useEffect(() => {
		getGoogleDoc();
	}, [])
	return (
		<>
			<h1>edit</h1>
			<h2>{item.name}</h2>
			<EditForm item={item} />
		</>
	)

}

export default Edit;
