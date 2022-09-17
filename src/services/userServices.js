import axios from "axios";

const url = "http://localhost:8080"

async function Login(user) {
	try {
		let result = await axios.post(url + "/api/users/login", user)
		return result
	} catch(e) {
		return e
	}
}

async function Register(user) {
	try {
		let result = await axios.post(url + "/api/users/register", user)
		return result
	} catch(e) {
		return e
	}
}

async function Logout(user) {
	try {
		let result = await axios.get(url + "/api/users/logout")
		return result
	} catch (e) {
		return e
	}
}

export { Login, Logout };
