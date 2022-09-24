import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { DeleteRatingById } from "../services/ratingServices";
import useToken from "../zustand";

function DeleteForm(props) {
    const [isSubmitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const token = useToken(state => state.token);
    const navigate = useNavigate();

    async function deleteBook(event){
	event.preventDefault();
	try {
	    setSubmitting(true);
	    const result = await DeleteRatingById(props.item.rating_id, token);
	    if (result.response) {
		setError(result.response.data.Message)
		setSubmitting(false)
	    } else {
		setSubmitting(false);
		navigate("/");
	    }
	} catch (e) {
	    setError(e.message);
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
	    <Typography variant="h6" sx={{my: 1}}>{error}</Typography>
	    <Stack sx={{width: "100%"}}>
		<Button variant="contained" type="submit" disabled={isSubmitting} onClick={deleteBook} sx={{my: 3}}>
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
