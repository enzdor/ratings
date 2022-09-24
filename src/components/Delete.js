import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteForm from "./DeleteForm";
import { useNavigate } from "react-router-dom";
import { GetRatingById } from "../services/ratingServices";
import useToken from "../zustand";

function Delete() {
    const params = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const token = useToken(state => state.token)

    useEffect(() => {
	if (token === "") {
	    navigate("/")
	}
	setLoading(false);
    }, [token])

    useEffect(() => {
	getItem();
    }, [])

    async function getItem() {
	try {
	    const newItem = await GetRatingById(params.id, token);
	    if (newItem.response) {
		setError(newItem.response.data.Message)
		setLoading(false)
	    } else {
		setItem({ ...newItem.data, id: params.id });
		setLoading(false);
	    }
	} catch (e){
	    setError(e)
	    setLoading(false);
	}
    }

    return (
	<>
	    { !error ? loading ? <h1>loading</h1> : <DeleteForm item={item} /> : <h1>{error}</h1>} 
	</>
    )
}


export default Delete;
