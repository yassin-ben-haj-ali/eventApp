import axios from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { userData } from "./useLogin";

type SignupData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};
type SignupResponse = {
	message: string;
	user: userData;
};
const signup = async (data: SignupData): Promise<SignupResponse> => {
	const res = await axios.post("/auth/signup", data);
	return res.data;
};

const useSignup = () => {
	return useMutation({
		mutationFn: async (data: SignupData) => await signup(data),
	});
};
export default useSignup;
