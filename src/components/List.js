import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
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
	    <Header />
	    <Container>
		<Formik
		    initialValues={{ name: '', type: '', consumed: ''}}
		    validate={values => {
			const errors = {};
			if (!values.type) {
			    errors.type = "Required";
			}
		    }}
		    onSubmit={ async (values, { setSubmitting }) => {
			try {
			    if (values.consumed !== "any" && values.consumed !== "") {
				if (values.name !== "") {
				    if (values.type !== "") {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("consumed", "==", values.consumed),
					    where("name", "==", values.name),
					    where("type", "==", values.type)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    } else {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("consumed", "==", values.consumed),
					    where("name", "==", values.name)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    }
				} else {
				    if (values.type !== "") {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("consumed", "==", values.consumed),
					    where("type", "==", values.type)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    } else {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("consumed", "==", values.consumed)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    }
				}
			    } else {
				if (values.name !== "") {
				    if (values.type !== "") {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("name", "==", values.name),
					    where("type", "==", values.type)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    } else {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("name", "==", values.name)
					);
					const list = await getDocs(q);
					setItems(list.docs.map((doc) => (({...doc.data(), id: doc.id}))));
					setSubmitting(false);
				    }
				} else {
				    if (values.type !== "") {
					const q = query(
					    collection(db, "banana"), 
					    where("uid", "==", googleUser.uid), 
					    where("type", "==", values.type)
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
				}
			    }
			} catch (e) {
			    setGoogleError(e.message);
			    setSubmitting(false);
			}
		    }}
		>
		    {({ isSubmitting }) => (
			<Form>
			    <Container maxWidth="md">
				<Typography variant="h3" sx={{my: 1}}>list</Typography>
				<Typography variant="h6" sx={{my: 1}}>{googleError}</Typography>
				<MyTextField 
				    id="type"
				    type="text" 
				    name="type" 
				    label="Type"
				/>
				<MyTextField 
				    id="name"
				    type="text" 
				    name="name" 
				    label="Name"
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
					    value="any"
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
			    <Grid item key={item.id} xs={12} sm={6} md={4}>
				<Card variant="outlined">
				    <CardContent>
					<Typography variant="h4">{item.name}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Rating: {item.rating}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Type: {item.type}</Typography>
					<Typography variant="h6" sx={{mt: 1}}>Consumed: {item.consumed}</Typography>
				    </CardContent>
				    <CardActions>
					<Button onClick={() => {navigate(`/edit/${item.id}`)}}>
					    edit
					</Button>
					<Button onClick={() => {navigate(`/delete/${item.id}`)}}>
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
