import { feedsSlice } from "@/EventDetails/store/feedsSlice";
import type { FeedsSlice } from "@/EventDetails/store/types";
import { eventsSlice } from "@/HomePage/store/EventsSlice";
import type { EventsSlice } from "@/HomePage/store/types";
import type { MyUserSlice } from "@/LoginPage/store/types";
import { myUserSlice } from "@/LoginPage/store/userSlice";
import { create } from "zustand";

export const useStore = create<MyUserSlice & EventsSlice & FeedsSlice>((...a) => ({
	...myUserSlice(...a),
	...eventsSlice(...a),
	...feedsSlice(...a),
}));
