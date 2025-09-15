import { useStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Event } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type EventsResponse = {
	paginatedResult: Event[];
	totalCount: number;
};

const take = 10;
const getEvents = async (
	pageParam: number,
	searchFilter: string,
	axiosPrivate: AxiosInstance,
	eventId?: string
): Promise<EventsResponse> => {
	let where;
	const orderBy = "orderBy[createdAt]=asc";
	if (eventId) {
		where = `where[id]=${eventId}` + (where ? `&${where}` : "");
	}
	const searchQuery = searchFilter
		? `&where[OR][0][name][contains]=${encodeURIComponent(searchFilter)}&where[OR][0][name][mode]=insensitive` +
			`&where[OR][1][description][contains]=${encodeURIComponent(searchFilter)}&where[OR][1][description][mode]=insensitive` +
			`&where[OR][2][location][contains]=${encodeURIComponent(searchFilter)}&where[OR][2][location][mode]=insensitive`
		: "";
	const response = await axiosPrivate.get(
		`/event?skip=${pageParam * take}&take=${take}&${where}&${orderBy}${searchQuery}`
	);
	return response.data;
};
const useGetEvents = (eventId?: string, options?: { enabled: boolean }) => {
	const setEvents = useStore((state) => state.event.setEvents);
	const searchFilter = useStore((state) => state.event.searchFilter);
	const axiosPrivate = useAxiosPrivate();
	const eventsQuery = useInfiniteQuery({
		queryKey: ["events", searchFilter, axiosPrivate, eventId],
		queryFn: ({ pageParam = 0 }) => {
			return getEvents(pageParam, searchFilter, axiosPrivate, eventId);
		},
		enabled: options?.enabled,
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			const pageNumbers = Math.ceil(lastPage.totalCount / take);
			const currentPage = allPages.length;
			if (currentPage < pageNumbers) {
				return currentPage;
			}
			return undefined;
		},
	});

	useEffect(() => {
		if (eventsQuery.data) {
			setEvents(eventsQuery.data.pages.map((page) => page.paginatedResult).flat());
		}
	}, [eventsQuery.data]);
	return eventsQuery;
};

export default useGetEvents;
