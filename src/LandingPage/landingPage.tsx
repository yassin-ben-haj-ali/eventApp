import Footer from "./Footer";
import Header from "./Header";
import Banner from "./sections/Banner";
import Events from "./sections/Events/Events";

const LandingPage = () => {
	return (
		<div className="space-y-6">
        <Header />
        <div className="space-y-12">
			<Banner />
			<Events />
		</div>
            <Footer />
        </div>
	);
};

export default LandingPage;
