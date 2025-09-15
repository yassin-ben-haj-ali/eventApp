import type { User } from "@/LoginPage/store/types";

export type Registration = {
	userId: string;
	eventId: string;
	user: User;
	event: Event;
	id: string;
};

export type Event = {
	id: string;
	name: string;
	description: string;
	date: string;
	location: string;
	status: string;
	events: Registration[];
};

export type EventsSlice = {
	event: {
		events: Event[];
		setEvents: (events: Event[]) => void;
		searchFilter: string;
		setSearchFilter: (keyword: string) => void;
	};
};
