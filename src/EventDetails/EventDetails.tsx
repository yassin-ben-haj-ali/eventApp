import useGetEvents from "@/HomePage/hooks/useGetEvents";
import { useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";

const EventsDetailsPage = () => {
	const params = useParams();
	const eventId = params.id;
	const eventDetails = useGetEvents(eventId, { enabled: !!eventId });
	const user = useStore((state) => state.myUser.authenticationResult);
	const checkDateDifference = (eventDate: string | Date) => {
		const now = new Date();
		const eventDateTime = new Date(eventDate);
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const eventDay = new Date(
			eventDateTime.getFullYear(),
			eventDateTime.getMonth(),
			eventDateTime.getDate()
		);
		const timeDifference = eventDay.getTime() - today.getTime();
		const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
		return daysDifference >= 1;
	};
	const userSubscribed = eventDetails.data?.pages?.[0].paginatedResult?.[0].events.some(
		(registration) => registration.userId == user?.id
	);

	if (eventDetails.isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<div className="flex h-96 gap-3">
				<div className="flex basis-1/2 flex-col space-y-4 overflow-hidden p-2">
					<h1 className="text-2xl font-bold break-words text-gray-900">
						{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].name}
					</h1>
					<div className="flex flex-shrink-0 items-center gap-2 text-gray-700">
						<Calendar className="h-3 w-3 text-gray-500" />
						<span className="truncate">
							{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].date}
						</span>
					</div>
					<div className="flex flex-shrink-0 items-center gap-2 text-gray-700">
						<MapPin className="h-3 w-3 text-gray-500" />
						<span className="truncate">
							{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].location}
						</span>
					</div>
					<div className="min-h-1 flex-1">
						<p className="h-full overflow-y-auto pr-2 break-words whitespace-pre-wrap text-gray-600">
							{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].description}
						</p>
					</div>
					<div className="flex w-full items-end justify-end space-x-3 pt-4">
						<Button
							type="button"
							className="w-1/2 cursor-pointer bg-[#7C93C3] text-white hover:bg-[#7C93C3]"
						>
							Consulter les avis
						</Button>

						{!userSubscribed &&
							checkDateDifference(
								eventDetails.data?.pages?.[0]?.paginatedResult?.[0].date ?? new Date()
							) && (
								<Button className="w-1/2 cursor-pointer" type="button">
									Participer
								</Button>
							)}
					</div>
				</div>
				<div className="flex-shrink-0 basis-1/2 overflow-hidden rounded-3xl">
					<img src="/banner.jpg" alt="event cover image" className="h-full w-full object-cover" />
				</div>
			</div>
		</div>
	);
};

export default EventsDetailsPage;
