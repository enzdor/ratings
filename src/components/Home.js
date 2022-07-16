import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate();

    return (
	<>
	    <h1>home</h1>
	    <button onClick={() => {signOut(auth)}}>
		sign out
	    </button>
	    <button onClick={() => {navigate("/login")}}>
		log in
	    </button>
	    <button onClick={() => {navigate("/register")}}>
		register
	    </button>
	</>
    )
}

export default Home;
