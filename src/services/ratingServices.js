import axios from "axios";

const url = "http://localhost:8080"

async function GetRatingById(id, token) {
    try {
	let target = url + "/api/ratings/" + id;
	let result = await axios.get(target, {
	    headers: {
		"jwt-token": token,
	    }
	})
	return result
    } catch (e) {
	return e
    }
}


export { GetRatingById };
