import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export type RegistrationPayload = {
	eventId: string;
};

type EventRegistration = {
	id: string;
	userId: string;
	eventId: string;
};

const createRegistration = async (
	payload: RegistrationPayload,
	axiosPrivate: AxiosInstance
): Promise<EventRegistration> => {
	const response = await axiosPrivate.post("/registration", payload);
	return response.data;
};
const useCreateRegistration = () => {
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
	const createRegistrationMutation = useMutation({
		mutationFn: (payload: RegistrationPayload) => createRegistration(payload, axiosPrivate),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["events"],
			});
			setCreateModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "registration created successfully",
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
	const handleCreateRegistration = async (payload: RegistrationPayload) => {
		await createRegistrationMutation.mutateAsync(payload);
	};
	return {
		handleCreateRegistration,
		createModalState,
		setCreateModalState,
		isLoading: createRegistrationMutation.isPending,
	};
};

export default useCreateRegistration;
