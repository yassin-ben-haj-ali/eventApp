import axios from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

type loginData={
    email: string;
    password: string;
}

type userData = {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: string;
}

type loginResponse = {
message:string;
user:{
    accessToken: string;
refreshToken: string;
data:userData
}
}

const loginUser = async (data:loginData):Promise<loginResponse> =>{
   const res = await axios.post('/auth/login', data);
   return res.data;
}

const useLoginUser = () => {
    return useMutation({
        mutationFn: async (data: loginData) => await loginUser(data),
    });
}

export default useLoginUser;