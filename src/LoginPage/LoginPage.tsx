import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchemaType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import useLogin from "./hooks/useLogin";
const LoginPage = () => {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
	});
	const { register, formState, handleSubmit } = form;
	const { errors } = formState;
	const loginQuery = useLogin();
	const onSubmit = (data: LoginSchemaType) => {
		loginQuery.mutate(data);
	};
	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<CustomInput
						label="Email"
						placeholder="Entrez votre email"
						type="email"
						{...register("email")}
						error={errors.email?.message}
						required
					/>
					<CustomInput
						label="Mot de passe"
						placeholder="Entrez votre mot de passe"
						type="password"
						passwordInput
						{...register("password")}
						error={errors.password?.message}
						required
					/>
				</div>
				<Button type="submit" className="w-full">
					Se connecter
				</Button>
			</form>
			<div className="text-center">
				<p>
					Vous n'avez pas de compte ?{" "}
					<a href="/register" className="text-primary font-bold hover:underline">
						S'inscrire
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
