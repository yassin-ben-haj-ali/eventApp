type EventCardProps = {
	name: string;
	date: string;
	location: string;
	image?: string;
	subscribeButton: boolean;
};
const EventCard: React.FC<EventCardProps> = ({ name, date, location, image, subscribeButton }) => {
	return (
		<div className={`h-96 space-y-3 rounded-lg bg-white p-4 shadow-lg`}>
			{image && <img src={image} alt={name} className="h-48 w-full rounded-t-lg object-cover" />}
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">{name}</h2>
				<p className="text-gray-600">{date}</p>
				<p className="text-gray-600">{location}</p>
				<div>
					{subscribeButton && (
						<button className="bg-primary rounded px-4 py-2 text-white hover:cursor-pointer">
							Participer
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
