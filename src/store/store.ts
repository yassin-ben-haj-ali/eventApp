import { eventsSlice } from "@/HomePage/store/EventsSlice";
import type { EventsSlice } from "@/HomePage/store/types";
import type { MyUserSlice } from "@/LoginPage/store/types";
import { myUserSlice } from "@/LoginPage/store/userSlice";
import { create } from "zustand";

export const useStore = create<MyUserSlice & EventsSlice>((...a) => ({
	...myUserSlice(...a),
	...eventsSlice(...a),
}));
