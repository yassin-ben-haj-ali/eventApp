import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FeedToUpdate } from "../store/types";

const editFeed = async (
	payload: { id: string; feed: FeedToUpdate },
	axiosPrivate: AxiosInstance
) => {
	const response = await axiosPrivate.patch(`/feed/${payload.id}`, payload.feed);
	return response.data;
};

const useEditFeed = () => {
	const [modalState, setModalState] = useState<{
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

	const handleModal = (isOpen: boolean) => {
		setModalState((prev) => ({ ...prev, isOpen: isOpen }));
	};
	const axiosPrivate = useAxiosPrivate();
	const queryClient = useQueryClient();
	const editFeedMutation = useMutation({
		mutationFn: (payload: { id: string; feed: FeedToUpdate }) => editFeed(payload, axiosPrivate),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["feeds"] });
			setModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "success",
			});
		},
		onError: () => {
			setModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "Error",
			});
		},
	});

	const handleEditFeed = async (id: string, feed: FeedToUpdate) => {
		await editFeedMutation.mutateAsync({ id, feed });
	};

	return {
		handleEditFeed,
		modalState,
		handleModal,
		isLoading: editFeedMutation.isPending,
	};
};

export default useEditFeed;
