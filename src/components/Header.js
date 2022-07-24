import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate();

	return (
		<Container maxWidth={false}>
			<Typography variant="h3" color="primary" sx={{cursor: "pointer"}} onClick={() => navigate("/")}>ratings</Typography>
		</Container>
	)
}

export default Header;
