import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import PersistLogin from "./PersistLogin";
import RegisterPage from "./LoginPage/RegisterPage";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import HomePage from "./HomePage/HomePage";
import LoginPageLayout from "./LoginPage/LoginPageLayout";
import LandingPage from "./LandingPage/landingPage";
const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PersistLogin />}>
				<Route
					path="login"
					element={
						<LoginPageLayout>
							<LoginPage />
						</LoginPageLayout>
					}
				/>
			</Route>
			<Route element={<RegisterPage />} />
			<Route path="/landing" element={<LandingPage />} />
			<Route element={<PersistLogin />}>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/home" replace />} />
					<Route element={<RequireAuth />}>
						<Route path="/home" element={<HomePage />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
