import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const styleButton = {
    width: "10rem",
}

function Home(){
    const navigate = useNavigate();
    const [googleUser, setGoogleUser] = useState({});
    onAuthStateChanged(auth, (user) => {
	setGoogleUser(user);
    })

    return (
	<>
	    <Container maxWidth="xs" sx={{display: "flex", alignItems: "center", flexDirection: "column", mt: 8}}>
		<Typography variant="h3" sx={{my: 1}}>home</Typography>
		<Stack spacing={2}>
		    {!googleUser 
			? 
			    <>
				<Button variant="contained" sx={styleButton} onClick={() => {navigate("/login")}}>
				    log in
				</Button>
				<Button variant="contained" sx={styleButton} onClick={() => {navigate("/register")}}>
				    register
				</Button>
			    </>
			:
			    <>
				<Button variant="contained" sx={styleButton} onClick={() => {signOut(auth)}}>
				    sign out
				</Button>
				<Button variant="contained" sx={styleButton} onClick={() => {navigate("/add")}}>
				    add
				</Button>
				<Button variant="contained" sx={styleButton} onClick={() => {navigate("/list")}}>
				    list
				</Button>
			    </>
		    }
		</Stack>
	    </Container>
	</>
    )
}

export default Home;
