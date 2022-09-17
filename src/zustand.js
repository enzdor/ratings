import create from "zustand";

const useToken = create((set) => ({
	token: "",
	setToken: (token) => set((state) => ({token: token}))
}))

export default useToken;
