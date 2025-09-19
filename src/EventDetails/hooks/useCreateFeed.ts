import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { Feed } from "../store/types";

export type feedPayload = {
	eventId: string;
	text: string;
};

const createFeed = async (payload: feedPayload, axiosPrivate: AxiosInstance): Promise<Feed> => {
	const response = await axiosPrivate.post("/feed", payload);
	return response.data;
};
const useCreateFeed = () => {
	const queryClient = useQueryClient();
	const [createModalState, setCreateModalState] = useState<{
		isOpen: boolean;
		type: "success" | "error";
		title: string;
		description: string;
	}>({
		isOpen: false,
		type: "success",
		title: "",
		description: "",
	});

	const axiosPrivate = useAxiosPrivate();
	const createFeedMutation = useMutation({
		mutationFn: (payload: feedPayload) => createFeed(payload, axiosPrivate),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["feeds"],
			});
			setCreateModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "feedBack created successfully",
			});
		},
		onError: () => {
			setCreateModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "error",
			});
		},
	});
	const handleCreateFeed = async (payload: feedPayload) => {
		await createFeedMutation.mutateAsync(payload);
	};
	return {
		handleCreateFeed,
		createModalState,
		setCreateModalState,
		isLoading: createFeedMutation.isPending,
	};
};

export default useCreateFeed;
