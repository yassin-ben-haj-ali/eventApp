import axios from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { User } from "../store/types";

type SignupData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};
type SignupResponse = {
	message: string;
	user: User;
};
const signup = async (data: SignupData): Promise<SignupResponse> => {
	const res = await axios.post("/auth/signup", data);
	return res.data;
};

const useSignup = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async (data: SignupData) => await signup(data),
		onSuccess: () => navigate("/login"),
	});
};
export default useSignup;
