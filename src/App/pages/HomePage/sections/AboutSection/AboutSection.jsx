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
                        Мы создали приложение, чтобы сделать ваши тренировки максимально эффективными и доступными.
                        Независимо от вашего уровня подготовки, Wou поможет вам достичь новых высот, установить личные рекорды и полюбить процесс самосовершенствования.
                        Объединяя удобные инструменты, разнообразный контент и элементы геймификации, мы стремимся вдохновить вас на регулярные
                        занятия спортом и построение здорового образа жизни.
                    </div>
                </div>

            </div>
        </section>
    )
}

export default AboutSection;