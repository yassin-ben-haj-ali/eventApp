import { Routes, Route } from "react-router-dom";
import LoginPageLayout from "./LoginPage/LoginPageLayout";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./LoginPage/RegisterPage";
import LandingPage from "./LandingPage/landingPage";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route
				path="login"
				element={
					<LoginPageLayout>
						<LoginPage />
					</LoginPageLayout>
				}
			/>
			<Route
				path="register"
				element={
					<LoginPageLayout>
						<RegisterPage />
					</LoginPageLayout>
				}
			/>
		</Routes>
	);
};
export default AppRoutes;
