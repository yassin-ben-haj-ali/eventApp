import { useStore } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { Feed } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type FeedsResponse = {
	paginatedResult: Feed[];
	totalCount: number;
};

const take = 10;
const getFeeds = async (
	pageParam: number,
	axiosPrivate: AxiosInstance,
	eventId?: string
): Promise<FeedsResponse> => {
	let where;
	const orderBy = "orderBy[createdAt]=asc";
	if (eventId) {
		where = `where[eventId]=${eventId}` + (where ? `&${where}` : "");
	}

	const response = await axiosPrivate.get(
		`/feed?skip=${pageParam * take}&take=${take}&${where}&${orderBy}`
	);
	return response.data;
};
const useGetFeeds = (eventId?: string, options?: { enabled: boolean }) => {
	const setFeeds = useStore((state) => state.feeds.setFeeds);
	const axiosPrivate = useAxiosPrivate();
	const feedsQuery = useInfiniteQuery({
		queryKey: ["feeds", axiosPrivate, eventId],
		queryFn: ({ pageParam = 0 }) => {
			return getFeeds(pageParam, axiosPrivate, eventId);
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
		if (feedsQuery.data) {
			setFeeds(feedsQuery.data.pages.map((page) => page.paginatedResult).flat());
		}
	}, [feedsQuery.data]);
	return feedsQuery;
};

export default useGetFeeds;
