import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Home(){
	onAuthStateChanged(auth, (user) => {
	    if (user) {
		console.log(user.email);
	    } else {
		console.log("user not logged");
	    }
	})

	return (
	    <>
		<h1>home</h1>
		<button onClick={() => {signOut(auth)}}>
		    sign out
		</button>
	    </>
	)
}

export default Home;
