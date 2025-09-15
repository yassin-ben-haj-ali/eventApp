import { Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar";

const Layout = () => {
	return (
		<div className="md:bg-primary-600 flex h-screen overflow-hidden bg-white">
			<div className="flex flex-grow flex-col gap-5 overflow-hidden">
				<Navbar />
				<main className="bg-white p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default Layout;
