import HeroSection from "./sections/HeroSection/HeroSection.jsx"
import AboutSection from "s/App/pages/HomePage/sections/AboutSection/AboutSection.jsx";
import SportSection from "s/App/pages/HomePage/sections/SportSection/SportSection.jsx";

function HomePage() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <SportSection />
            <div className="spacer"></div>
        </div>
    )
}

export default HomePage;