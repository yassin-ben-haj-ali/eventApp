import type { User } from "@/LoginPage/store/types";

export type Feed = {
	id: string;
	text: string;
	user: User;
	event: Event;
	userId: string;
	eventId: string;
	createdAt: string;
	updatedAt: string;
};
export type FeedToUpdate = {
	text: string;
};

export type FeedsSlice = {
	feeds: {
		feeds: Feed[];
		setFeeds: (feeds: Feed[]) => void;
	};
};
