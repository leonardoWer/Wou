import "./AboutSection.css"
import {useEffect, useRef} from "react";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";

function AboutSection() {

    const titleRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        document.fonts.ready.then(() => {
            const splitDescr = new SplitText(descriptionRef.current, {type: "words"});

            gsap.from(splitDescr.words, {
                opacity: 0.5,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 70%",
                    endTrigger: descriptionRef.current,
                    end: "center center",
                    scrub: true,
                }
            })
        })
    })

    return (
        <section id="aboutSection">
            <div className="about-content-container">

                <div className="section-text-container about-text-container">
                    <div className="section-title-text"
                        ref={titleRef}>
                        О нас
                    </div>
                    <div className="section-description-text"
                         ref={descriptionRef}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias blanditiis consectetur, consequuntur dicta dignissimos doloribus eius eos error et itaque laboriosam laborum libero maiores molestiae mollitia nisi obcaecati porro praesentium quaerat quis repudiandae rerum, saepe sapiente temporibus voluptatem voluptatum.
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AboutSection;