type LoginPageLayoutProps = {
	children: React.ReactNode;
};
const LoginPageLayout: React.FC<LoginPageLayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen w-screen flex-row">
			<div className="flex h-full basis-3/5 flex-col items-center justify-center">{children}</div>
			<div className="bg-primary flex basis-2/5 items-center justify-center text-3xl font-bold text-white">
				Des expériences mémorables
			</div>
		</div>
	);
};

export default LoginPageLayout;
