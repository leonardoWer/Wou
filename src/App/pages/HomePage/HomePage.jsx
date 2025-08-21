import HeroSection from "./sections/HeroSection/HeroSection.jsx"
import AboutSection from "s/App/pages/HomePage/sections/AboutSection/AboutSection.jsx";
import SportSection from "s/App/pages/HomePage/sections/SportSection/SportSection.jsx";
import PlansSection from "s/App/pages/HomePage/sections/PlansSection/PlansSection.jsx";
import FeaturesSection from "s/App/pages/HomePage/sections/FeaturesSection/FeaturesSection.jsx";

function HomePage() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <SportSection />
            <PlansSection />
            <FeaturesSection />
        </div>
    )
}

export default HomePage;