import EventsList from "./EventsList";

const Events = () => {
	return (
		<div className="container mx-auto space-y-4">
			<h1 className="text-center text-3xl font-bold">Événements à venir</h1>
			<p className="text-center text-lg">
				Restez informé des événements passionnants à venir dans notre usine.
			</p>
			<EventsList />
		</div>
	);
};

export default Events;
