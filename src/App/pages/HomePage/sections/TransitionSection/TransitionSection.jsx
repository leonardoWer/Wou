import "./TransitionSection.css"

import {useRef, useEffect} from "react";

import gsap from "gsap"
import TextPlugin from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

function TransitionSection() {

    const rightTextData = [
        "Приложение, сделанное с любовью к спорту",
        "Рекорды начинаются здесь",
    ]

    const containerRef = useRef(null);
    const leftContainerRef = useRef(null);
    const rightContainerRef = useRef(null);
    const rightTextRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "center 40%",
                scrub: 1,
                invalidateOnRefresh: true
            }
        })

        const getXValue = () => {
            const width = leftContainerRef.current.offsetWidth;
            const leftContainerRect = leftContainerRef.current.getBoundingClientRect();
            const rightContainerRect = rightContainerRef.current.getBoundingClientRect();
            return rightContainerRect.left - leftContainerRect.left - width * 1.1;
        }

        tl.to(leftContainerRef.current, {
            x: () => getXValue(),
            ease: "linear",
            duration: 2
        })
            .to(rightTextRef.current, {
                text: "",
                ease: "linear",
                duration: 2
            }, "1")
            .to(rightTextRef.current, {
                text: rightTextData[1],
                ease: "linear",
                duration: 2
            })

        return (() => {
            tl.kill()
        })
    }, [])

    return (
        <section id="transitionSection">
            <div className="transition-container"
                ref={containerRef}>
                <div className="transition__left"
                    ref={leftContainerRef}>
                    Wou
                </div>

                <div className="transition__right"
                     ref={rightContainerRef}>
                    <p className="transition-right__text"
                        ref={rightTextRef}>
                        {rightTextData[0]}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default TransitionSection;