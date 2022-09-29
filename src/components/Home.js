import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../zustand";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const styleButton = {
    width: "10rem",
}

function Home(){
    const token = useToken(state => state.token)
    const setToken = useToken(state => state.setToken)
    const navigate = useNavigate();
    const [isToken, setIsToken] = useState(false);
    useEffect(() => {
	if (token !== "") {
	    setIsToken(true)
	} else {
	    setIsToken(false)
	}
    }, [token])


    return (
	<>
	    <Container maxWidth="xs" sx={{display: "flex", alignItems: "center", flexDirection: "column", mt: 8}}>
		<Typography variant="h3" sx={{my: 1}}>home</Typography>
		<Stack spacing={2}>
		    {!isToken 
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
				<Button variant="contained" sx={styleButton} onClick={() => {setToken("")}}>
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
