import axios from "axios";

const url = "http://localhost:8080"

function formatRating(rating) {
    if (rating.consumed === "true") {
	rating.consumed = true;
    } else if (rating.consumed === "false") {
	rating.consumed = false;
    } else if (rating.consumed === "") {
	rating.consumed = -1;
    }
    if (rating.rating === "") {
	rating.rating = -1;
    }


    rating.name.trim();
    rating.entry_type.trim();

    return rating;
}

async function GetRatingById(id, token) {
    try {
	let target = url + "/api/ratings/" + id;
	let result = await axios.get(target, {
	    headers: {
		"jwt-token": token,
	    }
	})
	if (result.data) {
	    if (result.data.consumed === true) {
		result.data.consumed = "true"
	    } else if (result.data.consumed === false){
		result.data.consumed = "false"
	    }
	}
	return result
    } catch (e) {
	return e
    }
}

async function SearchRatingsByUserId(rating, token) {
    rating = formatRating(rating)
    if (rating.consumed === true) {
	rating.consumed = 1;
    } else if (!rating.consumed === false){
	rating.consumed = 0;
    } else {
	rating.consumed = -1;
    } 

    try {
	let target = url + "/api/ratings/search";
	let result = await axios.post(target, rating, {
	    headers: {
		"jwt-token": token,
	    }
	})
	return result
    } catch (e) {
	return e
    }
}

async function PostRating(rating, token) {
    rating = formatRating(rating)
    try {
	let target = url + "/api/ratings/";
	let result = await axios.post(target, rating, {
	    headers: {
		"jwt-token": token,
	    },
	})
	return result
    } catch (e) {
	return e
    }
}

async function PatchRating(id, rating, token) {
    rating = formatRating(rating)
    try {
	let target = url + "/api/ratings/" + id;
	let result = await axios.patch(target, rating, {
	    headers: {
		"jwt-token": token,
	    },
	})
	return result
    } catch (e) {
	return e
    }
}


export { SearchRatingsByUserId, PostRating, GetRatingById, PatchRating };
