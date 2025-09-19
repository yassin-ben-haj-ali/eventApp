import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { X, Edit, Plus, Save } from "lucide-react";
import useGetFeeds from "./hooks/useGetFeeds";
import { useParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { useInView } from "react-intersection-observer";
import useCreateFeed from "./hooks/useCreateFeed";
import ConfirmModal from "@/layouts/ConfirmModal";
import useDeleteFeed from "./hooks/useDeleteFeed";
import useEditFeed from "./hooks/useEditFeed";
import type { Feed } from "./store/types";
import Loader from "@/components/ui/Loader/Loader";

const FeedBackDialog = () => {
	const params = useParams();
	const eventId = params.id;
	const { inView } = useInView({
		threshold: 0,
	});
	const getEventsQuery = useGetFeeds(eventId, {
		enabled: !!eventId,
	});
	const { handleCreateFeed } = useCreateFeed();
	const { handleDeleteFeed, isPending } = useDeleteFeed();
	const { handleEditFeed, isLoading } = useEditFeed();

	const feeds = useStore((state) => state.feeds.feeds);

	useEffect(() => {
		if (inView && getEventsQuery.hasNextPage) {
			getEventsQuery.fetchNextPage();
		}
	}, [inView, getEventsQuery.hasNextPage, getEventsQuery.fetchNextPage]);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [showAddForm, setShowAddForm] = useState<boolean>(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [newComment, setNewComment] = useState<string>("");
	const [editComment, setEditComment] = useState<string>("");

	const handleAddFeedback = (): void => {
		setShowAddForm(true);
		setNewComment("");
	};

	const handleSaveNewFeedback = async (): Promise<void> => {
		if (!newComment.trim()) return;
		await handleCreateFeed({ eventId: eventId!, text: newComment }).then(() => {
			setShowAddForm(false);
			setNewComment("");
		});
	};

	const handleCancelAdd = (): void => {
		setShowAddForm(false);
		setNewComment("");
	};

	const handleEdit = (feedbackId: string, currentComment: string): void => {
		setEditingId(feedbackId);
		setEditComment(currentComment);
	};

	const handleSaveEdit = async (feedback: Feed): Promise<void> => {
		if (!editComment.trim()) return;
		handleEditFeed(feedback.id, { text: editComment }).then(() => {
			setEditingId(null);
			setEditComment("");
		});
	};

	const handleCancelEdit = (): void => {
		setEditingId(null);
		setEditComment("");
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		type: "new" | "edit"
	): void => {
		const value = e.target.value;
		if (type === "new") {
			setNewComment(value);
		} else {
			setEditComment(value);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					type="button"
					className="w-1/2 cursor-pointer bg-[#7C93C3] text-white hover:bg-[#7C93C3]"
					onClick={() => setIsOpen(true)}
				>
					Consulter les avis
				</Button>
			</DialogTrigger>
			<DialogContent
				showCloseButton={false}
				className="max-h-[85vh] w-[95vw] max-w-[1400px] overflow-hidden"
				style={{
					boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.80)",
					minWidth: "1200px",
				}}
			>
				<DialogHeader>
					<DialogTitle className="text-2xl font-[600] text-[#4C4C4C]">
						<div className="flex w-full items-center justify-between">
							<h1>Les avis sur l'événement</h1>
							<button type="button" onClick={() => setIsOpen(false)}>
								<X className="text-label size-4" />
							</button>
						</div>
					</DialogTitle>
				</DialogHeader>

				<div className="flex h-[60vh] gap-6">
					<div className="w-1/2 flex-shrink-0">
						<img
							src={"/banner.jpg"}
							alt={"Event Cover"}
							className="h-full w-full rounded-lg object-cover"
						/>
					</div>

					<div className="flex-1 overflow-y-auto">
						{!showAddForm ? (
							<div className="mb-4">
								<button
									onClick={handleAddFeedback}
									className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#7C93C3] p-3 text-white transition-colors hover:bg-[#6B82B0] disabled:cursor-not-allowed disabled:opacity-50"
								>
									<Plus className="h-4 w-4" />
									Ajouter un avis
								</button>
							</div>
						) : (
							<div className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
								<h4 className="mb-3 font-medium text-[#4C4C4C]">Ajouter votre avis</h4>
								<textarea
									value={newComment}
									onChange={(e) => handleInputChange(e, "new")}
									placeholder="Partagez votre expérience sur cet événement..."
									className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-[#7C93C3] focus:outline-none"
									rows={4}
								/>
								<div className="mt-3 flex items-center gap-2">
									<button
										onClick={handleSaveNewFeedback}
										disabled={!newComment.trim()}
										className="flex items-center gap-1 rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<Save className="h-4 w-4" />
										Enregistrer
									</button>
									<button
										onClick={handleCancelAdd}
										className="flex items-center gap-1 rounded-md bg-gray-500 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
									>
										<X className="h-4 w-4" />
										Annuler
									</button>
								</div>
							</div>
						)}

						<div className="space-y-4 pr-2">
							{feeds.map((feedback) => (
								<div
									key={feedback.id}
									className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
								>
									<div className="mb-3 flex items-start justify-between">
										<div className="flex items-center gap-3">
											<img
												src={"/avatar.jpg"}
												alt={"User Avatar"}
												className="h-10 w-10 rounded-full object-cover"
											/>
											<div>
												<h4 className="font-medium text-[#4C4C4C]">
													{`${feedback.user.firstName} ${feedback.user.lastName}`}
												</h4>
												<div className="mt-1 flex items-center gap-2">
													<div className="flex"></div>
													<span className="text-xs text-gray-500">
														{new Date(feedback.createdAt).toLocaleDateString("fr-FR")}
													</span>
												</div>
											</div>
										</div>
										{feedback && (
											<div className="flex items-center gap-2">
												<button
													onClick={() => handleEdit(feedback.id, feedback.text)}
													disabled={editingId !== null}
													className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
													title="Modifier"
												>
													<Edit className="h-4 w-4" />
												</button>

												<ConfirmModal
													type="delete"
													title={"Supprimer l'avis"}
													description={
														"Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible."
													}
													handleConfirm={() => handleDeleteFeed(feedback.id)}
													isLoading={isPending}
												/>
											</div>
										)}
									</div>

									<div className="text-sm leading-relaxed text-gray-700">
										{editingId === feedback.id ? (
											<div className="mt-2">
												<textarea
													value={editComment}
													onChange={(e) => handleInputChange(e, "edit")}
													className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-[#7C93C3] focus:outline-none"
													rows={3}
												/>
												<div className="mt-2 flex items-center gap-2">
													<button
														onClick={() => handleSaveEdit(feedback)}
														disabled={!editComment.trim() || isLoading}
														className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-xs text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
													>
														{isLoading ? (
															<Loader
																width="16"
																height="16"
																className="flex items-center justify-center"
																fillColor="white"
															/>
														) : (
															<>
																<Save className="h-3 w-3" />
																Sauver
															</>
														)}
													</button>
													<button
														onClick={handleCancelEdit}
														className="flex items-center gap-1 rounded-md bg-gray-500 px-3 py-1 text-xs text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
													>
														<X className="h-3 w-3" />
														Annuler
													</button>
												</div>
											</div>
										) : (
											<p>{feedback.text}</p>
										)}
									</div>
								</div>
							))}

							{feeds.length === 0 && (
								<div className="py-8 text-center text-gray-500">
									<p>Aucun avis pour le moment.</p>
									<p className="mt-1 text-sm">Soyez le premier à laisser un commentaire !</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default FeedBackDialog;
