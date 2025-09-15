import { useInView } from "react-intersection-observer";
import EventCard from "@/LandingPage/sections/Events/EventCard";
import useGetEvents from "./hooks/useGetEvents";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";

const HomePage = () => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const getEventsQuery = useGetEvents(undefined, {
		enabled: true,
	});
	const events = useStore((state) => state.event.events);
	useEffect(() => {
		if (inView && getEventsQuery.hasNextPage) {
			getEventsQuery.fetchNextPage();
		}
	}, [inView, getEventsQuery.hasNextPage, getEventsQuery.fetchNextPage]);
	const user = useStore((state) => state.myUser.authenticationResult?.id);

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
	return (
		<div className="max-h-[calc(100vh-20rem)] overflow-auto">
			<div className="grid grid-cols-3 gap-4">
				{events.map((event) => {
					const isUserSubscribed = event.events.some((event) => event.userId == user);
					const enableSubscription = checkDateDifference(event.date);
					return (
						<div key={event.id}>
							<EventCard
								{...event}
								image="./banner.jpg"
								subscribeButton={!isUserSubscribed && enableSubscription}
							/>
						</div>
					);
				})}
				<div ref={ref}>
					{getEventsQuery.isFetchingNextPage && (
						<Loader className="flex w-full items-center justify-center" />
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
