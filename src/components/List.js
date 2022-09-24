import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import MyTextField from "./MyTextField";
import MyRadio from "./MyRadio";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { SearchRatingsByUserId } from "../services/ratingServices";
import useToken from "../zustand";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup.string(),
    type: yup.string(),
    rating: yup.number().min(0).max(10),
    consumed: yup.string()
})

function List() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const token = useToken(state => state.token)
    useEffect(() => {
	if (token === "") {
	    navigate("/")
	}
    }, [token])

    return (
	<>
	    <Container>
		<Formik
		    initialValues={{ name: '', entry_type: '', consumed: '', rating: ''}}
		    validationSchema={validationSchema}
		    onSubmit={ async (values, { setSubmitting }) => {
			try {
			    setSubmitting(true);
			    const result = await SearchRatingsByUserId({...values, "user_id": 0},token);
			    if (result.response) {
				setError(result.response.data.Message);
				setSubmitting(false);
			    } else {
				setItems(result.data);
				setSubmitting(false);
			    }
			} catch (e){
			    setError(e)
			}
		    }}
		>
		    {({ isSubmitting }) => (
			<Form>
			    <Container maxWidth="md">
				<Stack direction="row">
				    <Typography 
					variant="h3" 
					color="primary" 
					sx={{cursor: "pointer", my: 1}} 
					onClick={() => navigate("/")}
				    >
					home 
				    </Typography>
				    <Typography variant="h3" sx={{my: 1}}>/list</Typography>
				</Stack>
				<Typography variant="h6" sx={{my: 1}}>{error}</Typography>
				<MyTextField 
				    id="name"
				    type="text" 
				    name="name" 
				    label="Name"
				/>
				<MyTextField 
				    id="entry_type"
				    type="text" 
				    name="entry_type" 
				    label="Type"
				/>
				<MyTextField
				    id="rating"
				    name="rating"
				    label="Rating"
				    type="number"
				/>
				<Stack sx={{width: "100%", my: 1}}>
				    <Typography variant="h6">Consumed:</Typography>
				    <Stack direction="row" sx={{width: "100%", my: 1}}>
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
					    value=""
					    label="any"
					    type="radio"
					/>
				    </Stack>
				</Stack>
				<Button fullWidth variant="contained" type="submit" disabled={isSubmitting} sx={{mb: 3}}>
				    submit
				</Button>
			    </Container>
			</Form>
		    )}
		</Formik>
		<Container maxWidth="md" sx={{mb: 3}}>
		    <Grid container spacing={2}>
			{items.map((item) => (
			    <Grid item key={item.rating_id} xs={12} sm={6} md={4}>
				<Card variant="outlined">
				    <CardContent>
					<Typography variant="h4">{item.name}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Rating: {item.rating}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Type: {item.entry_type}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Consumed: {item.consumed ? "true" : "false"}</Typography>
				    </CardContent>
				    <CardActions>
					<Button onClick={() => {navigate(`/edit/${item.rating_id}`)}}>
					    edit
					</Button>
					<Button onClick={() => {navigate(`/delete/${item.rating_id}`)}}>
					    delete
					</Button>
				    </CardActions>
				</Card>
			    </Grid>
			))}
		    </Grid>
		</Container>
	    </Container>
	</>
    )
}

export default List;
