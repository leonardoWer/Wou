import "./TransitionSection.css"

import {useRef, useEffect, use} from "react";

import gsap from "gsap"
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

function TransitionSection() {
    return (
        <section id="transitionSection">
            <MoveText/>
            <VerticalPhones/>
        </section>
    )
}

const MoveText = () => {
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
    )
}

const VerticalPhones = () => {

    const imgData = [
        "img/pages_mobile/settings_light-dark.png",
        "img/pages_mobile/workouts.png",
        "img/pages_mobile/tabata.png",
    ]

    const containerRef = useRef(null);
    const imgWrappersDataRef= useRef([]);

    useEffect(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "20% 80%",
                end: "bottom+=10% bottom",
                scrub: 0.5,
            }
        })

        imgWrappersDataRef.current.forEach((item, index) => {

            const indexCoef = index * 5;
            const indexCoefForAll = (5 - (index + 1)) * 1.5;

            tl.to(item, {
                y: `${-indexCoef * 2.5}vh`,
                rotateX: `+=${indexCoefForAll - indexCoef}`,
                rotateY: `+=${indexCoefForAll + indexCoef}`,
                rotateZ: `+=${-indexCoefForAll - indexCoef / 2}`,
            }, "<")
        })

        return (() => {
            tl.kill()
        })

    }, []);

    return (
        <div className="vertical-phones-container"
            ref={containerRef}>
            {imgData.map((item, index) => {

                const indexCoef = index * 5

                return (
                    <div className="vertical-phone__wrapper"
                         key={index}
                         ref={(el) => (imgWrappersDataRef.current[index] = el)}
                         style={{
                             zIndex: imgData.length - index,
                             top: `${index * 35}vh`,
                             transform: `
                        perspective(1000px)
                        rotateX(${40 + indexCoef}deg)
                        rotateY(${-4 - indexCoef / 2}deg)
                        rotateZ(${40 - indexCoef}deg)
                    `,}}>
                        <img src={item}
                             alt={"vertical-phone__" + index}
                             className="vertical-phone__img"/>
                    </div>
                )

            })}
        </div>
    )
}

export default TransitionSection;