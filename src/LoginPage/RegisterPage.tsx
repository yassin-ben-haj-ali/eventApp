import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchemaType } from "./types";
import CustomInput from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import useSignup from "./hooks/useSignup";

const RegisterPage = () => {
	const form = useForm({
		resolver: zodResolver(registerSchema),
	});

	const { register, formState, handleSubmit } = form;
	const { errors } = formState;
	const signupQuery = useSignup();
	const onSubmit = (data: RegisterSchemaType) => {
		signupQuery.mutate(data);
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<CustomInput
							label="Prénom"
							placeholder="Entrez votre prénom"
							type="text"
							{...register("firstName")}
							error={errors.firstName?.message}
							required
						/>
						<CustomInput
							label="Nom"
							placeholder="Entrez votre nom"
							type="text"
							{...register("lastName")}
							error={errors.lastName?.message}
							required
						/>
					</div>
					<CustomInput
						label="Email"
						placeholder="Entrez votre email"
						type="email"
						{...register("email")}
						error={errors.email?.message}
						required
					/>
					<div className="grid grid-cols-2 gap-4">
						<CustomInput
							label="Mot de passe"
							placeholder="Entrez votre mot de passe"
							type="password"
							passwordInput
							{...register("password")}
							error={errors.password?.message}
							required
						/>
						<CustomInput
							label="Confirmer le mot de passe"
							placeholder="Confirmez votre mot de passe"
							type="password"
							passwordInput
							{...register("confirmPassword")}
							error={errors.confirmPassword?.message}
							required
						/>
					</div>
				</div>
				<Button type="submit" className="w-full">
					S'inscrire
				</Button>
			</form>
			<div className="text-center">
				<p>
					Vous avez déjà un compte?{" "}
					<a href="/login" className="text-primary font-bold hover:underline">
						Se connecter
					</a>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
