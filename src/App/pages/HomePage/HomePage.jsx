import HeroSection from "./sections/HeroSection/HeroSection.jsx"
import AboutSection from "s/App/pages/HomePage/sections/AboutSection/AboutSection.jsx";

function HomePage() {
    return (
        <div>
            <HeroSection />
            <AboutSection />
            <div className="spacer"></div>
        </div>
    )
}

export default HomePage;