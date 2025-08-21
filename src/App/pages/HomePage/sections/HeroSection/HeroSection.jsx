import "./HeroSection.css"

import {useEffect, useRef} from "react";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

function HeroSection() {

    const contentContainerRef = useRef(null);
    const phoneContainerRef = useRef(null);
    const phoneContainerWrapperRef = useRef(null);
    const firstPhoneRef = useRef(null);

    useEffect(() => {
        const phoneContainer = phoneContainerRef.current;

        gsap.set(phoneContainer, {
            rotateX: 22
        })
        const phoneMoveTl = gsap.timeline({
            scrollTrigger: {
                trigger: phoneContainer,
                start: "top center",
                endTrigger: contentContainerRef.current,
                end: "bottom bottom",
                scrub: 1,
                pin: phoneContainer,
                invalidateOnRefresh: true,
            },
        })
        phoneMoveTl.to(phoneContainer, {
            rotateX: 0,
            perspective: 0,
            duration: 5,
            height: "60vh"
        })
            .to(firstPhoneRef.current, {
                opacity: 0,
                ease: "power2.inOut"
            }, "2.5")

        return (() => {
            phoneMoveTl.kill()
        })
    }, []);

    return (
        <section id="heroSection">
            <div className="hero-content-container"
            ref={contentContainerRef}>

                <div className="hero__top">
                    <img src="logo/logo-horizontal.svg" alt="logo" className="hero-logo-horizontal" />
                </div>

                <div className="hero-phone-wrapper"
                     ref={phoneContainerWrapperRef}>
                    <div className="hero__phone-container"
                         ref={phoneContainerRef}>
                        <img src="img/pages_mobile/home-page.png" alt="loading-page" className="hero__phone"/>
                        <img ref={firstPhoneRef} src="img/pages_mobile/loading-page.png" alt="loading-page" className="hero__phone"/>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HeroSection