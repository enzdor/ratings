import create from "zustand";
import { persist } from "zustand/middleware";

const useToken = create(
    persist(
	(set) => ({
		token: "",
		setToken: (token) => set((state) => ({token: token}))
	}),
	{
	    name: "token",
	}
    )
)

export default useToken;
