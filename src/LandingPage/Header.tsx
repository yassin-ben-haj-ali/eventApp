import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	return (
		<div className="text-primary container mx-auto flex items-center justify-between py-4">
			<h1 className="text-2xl font-bold">Leoni Tunisie Events</h1>
			<nav>
				<ul className="flex items-center space-x-8 text-lg font-medium">
					<li>
						<a href="/" className="hover:underline">
							Home
						</a>
					</li>
					<li>
						<a href="/" className="hover:underline">
							Events
						</a>
					</li>
					<button
						className="bg-primary rounded px-4 py-2 text-white hover:cursor-pointer"
						onClick={() => navigate("/login")}
					>
						Connexion
					</button>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
