import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import PersistLogin from "./PersistLogin";
import RegisterPage from "./LoginPage/RegisterPage";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import HomePage from "./HomePage/HomePage";
import LoginPageLayout from "./LoginPage/LoginPageLayout";
import LandingPage from "./LandingPage/landingPage";
import EventsDetailsPage from "./EventDetails/EventDetails";
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
			<Route
				path="register"
				element={
					<LoginPageLayout>
						<RegisterPage />
					</LoginPageLayout>
				}
			/>
			<Route path="/landing" element={<LandingPage />} />
			<Route element={<PersistLogin />}>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/home" replace />} />
					<Route element={<RequireAuth />}>
						<Route path="/home" element={<HomePage />} />
						<Route path="/events/:id" element={<EventsDetailsPage />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
