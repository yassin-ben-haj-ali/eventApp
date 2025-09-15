import axios from "@/api/axios";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { User } from "../store/types";

type loginData = {
	email: string;
	password: string;
};

type loginResponse = {
	message: string;
	data: User;
};

const loginUser = async (data: loginData): Promise<loginResponse> => {
	const res = await axios.post("/auth/login", data);
	return res.data;
};

const useLoginUser = () => {
	const setUser = useStore((state) => state.myUser.setUser);
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async (data: loginData) => await loginUser(data),
		onSuccess: (data) => {
			setUser(data.data);
			navigate("/");
		},
	});
};

export default useLoginUser;
