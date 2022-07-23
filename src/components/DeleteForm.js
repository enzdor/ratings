import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function DeleteForm(props) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [googleError, setGoogleError] = useState("");
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
	try {
	    setSubmitting(true);
	    const itemDoc = doc(db, "banana", props.item.id);
	    await deleteDoc(itemDoc);
	    setSubmitting(false);
	    navigate("/");
	} catch (e) {
	    setGoogleError(e.message);
	    setSubmitting(false);
	}
    };

    return (
	<Container
	    maxWidth="xs" 
	    sx={{
		display: "flex", 
		alignItems: "center", 
		flexDirection: "column", 
		mt: 4
	    }}
	>
	    <Typography variant="h3" sx={{my: 1}}>delete {props.item.name} entry</Typography>
	    <Typography variant="h6" sx={{my: 1}}>{googleError}</Typography>
	    <Stack sx={{width: "100%"}}>
		<Button variant="contained" type="submit" disabled={isSubmitting} onClick={deleteBookGoogle} sx={{my: 3}}>
		    delete
		</Button>
		<Button variant="contained" onClick={() => navigate("/list")} disabled={isSubmitting}>
		    return
		</Button>
	    </Stack>
	</Container>
    )
}

export default DeleteForm;
