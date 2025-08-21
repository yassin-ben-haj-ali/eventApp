const Footer = () => {
	return (
		<div>
			<footer className="bg-gray-800 py-4 text-white">
				<div className="container mx-auto text-center">
					<p>&copy; {new Date().getFullYear()} Leoni Tunisie. Tous droits réservés.</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
