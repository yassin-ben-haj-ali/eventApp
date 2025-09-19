import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "@/store/store";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { AxiosInstance } from "axios";

const deleteFeed = async (id: string, axiosPrivate: AxiosInstance) => {
	const response = await axiosPrivate.delete(`/feed/${id}`);
	return response.data;
};

const useDeleteFeed = () => {
	const feeds = useStore((state) => state.feeds.feeds);
	const setFeeds = useStore((state) => state.feeds.setFeeds);
	const [deleteModalState, setDeleteModalState] = useState<{
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

	const handleCloseDeleteModal = () => {
		setDeleteModalState((prev) => ({ ...prev, isOpen: false }));
	};
	const axiosPrivate = useAxiosPrivate();
	const deleteFeedMutation = useMutation({
		mutationFn: (id: string) => deleteFeed(id, axiosPrivate),
		onSuccess: (data) => {
			setDeleteModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "success.create_maintenance",
			});
			const updatedFeeds = feeds.filter((feed) => feed.id !== data.id);
			setFeeds(updatedFeeds);
		},
		onError: () => {
			setDeleteModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "error",
			});
		},
	});

	const handleDeleteFeed = async (id: string) => {
		await deleteFeedMutation.mutateAsync(id);
	};

	return {
		handleDeleteFeed,
		deleteModalState,
		handleCloseDeleteModal,
		isPending: deleteFeedMutation.isPending,
	};
};

export default useDeleteFeed;
