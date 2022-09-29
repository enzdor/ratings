import axios from "axios";

const url = "http://localhost:8080"

async function Login(user) {
	try {
		const result = await axios.post(url + "/api/users/login", user)
		return result
	} catch(e) {
		return e
	}
}

async function RegisterService(user) {
	try {
		const result = await axios.post(url + "/api/users/register", user)
		return result
	} catch(e) {
		return e
	}
}

async function Extend(token) {
    try {
	const result = await axios.get(url + "/api/users/extend", {
	    headers: {
		"jwt-token": token,
	    },
	})
	if (result.Message) {
	    return "";
	} else {
	    return result.data;
	}
    } catch (e) {
	return "";
    }
}

export { Login, RegisterService, Extend };
