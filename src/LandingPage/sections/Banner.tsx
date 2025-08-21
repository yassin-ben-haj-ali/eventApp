const Banner = () => {
	return (
		<div className="bg-[#4A919E] py-4 text-white">
			<div className="container mx-auto flex items-center">
				<div className="max-w-3xl basis-[50%] space-y-6">
					<h1 className="text-3xl font-bold">
						Bienvenue sur la plateforme des événements de Leoni Tunisie
					</h1>
					<p className="text-lg">Participez, échangez et vivez les moments forts de notre usine.</p>
					<button className="rounded bg-white px-4 py-2 text-[#4A919E] hover:cursor-pointer">
						Voir les événements à venir
					</button>
				</div>
				<div className="basis-[50%]">
					<img src="/banner.jpg" alt="Banner" className="h-auto w-full object-cover" />
				</div>
			</div>
		</div>
	);
};

export default Banner;
