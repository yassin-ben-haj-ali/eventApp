import React from "react";
import { Search, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LeoniLogo from "@/assets/LeoniLogo";
import { useStore } from "@/store/store";

const Navbar = () => {
	const user = useStore((state) => state.myUser);
	const setSearchFilter = useStore((state) => state.event.setSearchFilter);
	return (
		<nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full p-4 shadow-lg ring-1 shadow-black/5 ring-black/5 backdrop-blur">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center space-x-4">
						<LeoniLogo />
					</div>
					<div className="mx-8 max-w-lg flex-1">
						<div className="relative">
							<Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
							<Input
								type="text"
								placeholder="Search..."
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setSearchFilter(e.target.value)
								}
								className="pr-4 pl-10"
							/>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="relative h-10 w-10 rounded-full">
									<Avatar className="h-10 w-10">
										<AvatarImage
											src="./avatar.jpg"
											alt={`${user.authenticationResult?.firstName} ${user.authenticationResult?.lastName}`}
										/>
										<AvatarFallback>{`${user.authenticationResult?.firstName} ${user.authenticationResult?.lastName}`}</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm leading-none font-medium">{`${user.authenticationResult?.firstName} ${user.authenticationResult?.lastName}`}</p>
										<p className="text-muted-foreground text-xs leading-none">
											{user.authenticationResult?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="cursor-pointer">
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
