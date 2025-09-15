export type User = {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
	role: string;
};

type MyUserState = {
	authenticationResult: User | null;
	setUser: (user: User | null) => void;
};
export type MyUserSlice = {
	myUser: MyUserState;
};
