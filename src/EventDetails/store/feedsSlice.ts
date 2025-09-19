import type { StateCreator } from "zustand";
import type { FeedsSlice } from "./types";

const initialState = {
	feeds: [],
};

export const feedsSlice: StateCreator<FeedsSlice> = (set) => ({
	feeds: {
		...initialState,
		setFeeds: (feeds) =>
			set((state) => ({
				feeds: {
					...state.feeds,
					feeds,
				},
			})),
	},
});
