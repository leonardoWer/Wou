import "./SportSection.css"

import {useEffect, useRef, useState} from "react";

import gsap from "gsap";

function SportSection() {

    const contentContainer = useRef(null);
    const topContainerRef = useRef(null);

    const phonesContentContainerRef = useRef(null);
    const phonesContainerRef = useRef(null);

    const phonesDataRef= useRef([]);
    const [isPhonesReady, setIsPhonesReady] = useState(false);

    const phoneTextContainersDataRef = useRef([]);


    const phonesData =  [
        {
            title: "Тренировки",
            description: "Здесь вы найдёте видео тренировки на разные части тела",
            img: "img/pages_mobile/tabata.png"
        },
        {
            title: "Табата таймер",
            description: "Создавайте свои пресеты для табата таймера и тренируйтесь в своём темпе",
            img: "img/pages_mobile/tabata.png"
        },
        {
            title: "Планы тренировок",
            description: "Создавайте свои планы тренировок: " +
                "Настривайте их на любое количество дней, чтобы следовать программе, " +
                "Редактируйте количество повторений или время выполнения упражнения. ",
            img: "img/pages_mobile/tabata.png"
        },
        {
            title: "Календарь тренировок",
            description: "Планируйте тренировки, отмечайте их выполненными, отслеживайте прогресс",
            img: "img/pages_mobile/tabata.png"
        },
    ];

    // Функция для установки ref
    const setPhoneRef = (el, index) => {
        if (el) {
            phonesDataRef.current[index] = el;

            // Проверяем, все ли элементы загружены
            const allLoaded = phonesData.every((_, i) => phonesDataRef.current[i]);
            if (allLoaded && !isPhonesReady) {
                setIsPhonesReady(true);
            }
        }
    };

    // Phones container anim
    useEffect(() => {
        const phonesContainer = phonesContainerRef.current;
        const phoneElementsData = phonesDataRef.current;
        const phoneTextContainers = phoneTextContainersDataRef.current;

        gsap.set(phoneTextContainers, {
            opacity: 0,
            yPercent: 20
        })

        const getXValue = () => {
            const left = phonesContainer.getBoundingClientRect().left;
            return -(phonesContainer.offsetWidth - left * 0.4);
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: topContainerRef.current,
                start: "bottom bottom",
                endTrigger: contentContainer.current,
                end: "bottom bottom",
                pin: phonesContentContainerRef.current,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        tl.to(phonesContainer, {
            x: () => getXValue(),
            ease: "none",
        })
            .to(phoneElementsData.slice(0, phoneElementsData.length - 1), {
                opacity: 0,
                ease: "power3.out",
            }, "-=0.2")

        phoneTextContainers.reverse().forEach((phoneText, i) => {
            const phoneTextTl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                }
            })

            const fadeOut = {
                opacity: 0,
                yPercent: -20,
            }

            const delay = i * 0.5
            tl.to(phoneText, {
                opacity: 1,
                yPercent: 0,
                delay: delay,
            })
                .to(phoneText, {
                    ...(i === phoneTextContainers.length - 1 ? {} : fadeOut), // Применяем fadeOut ко всем, кроме последнего
                }, "+=0.4");

            tl.add(phoneTextTl)
        })


        return (() => {
            tl.kill()
        })
    }, [isPhonesReady])


    return (
        <section id="sportSection">
            <div className="sport-content-container"
                ref={contentContainer}>

                <div className="sport__top-container"
                    ref={topContainerRef}>
                    <div className="section-text-container">
                        <div className="sport-text-container__first-line">
                            <h4 className="first-line__title">Wou</h4>
                            <span className="first-line__description">
                            - Ваш личный фитнес тренер
                        </span>
                        </div>
                        <div className="sport-text-container__another-lines">
                            <p className="another-lines__description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam at doloremque error libero maxime quaerat quo recusandae rem sapiente.
                            </p>
                        </div>
                    </div>

                    <div className="sport__phones-content-container"
                         ref={phonesContentContainerRef}>

                        <div className="sport__phones-container"
                            ref={phonesContainerRef}>
                            {phonesData.map((phone, index) => (
                                <img key={index}
                                     ref={(el) => setPhoneRef(el, index)}
                                     src={phone.img}
                                     alt={phone.title + " screenshot"}
                                     className="sport-phone"/>
                            ))}
                        </div>

                        {phonesData.map((phone, index) => (
                            <div key={index}
                                 ref={(el) => phoneTextContainersDataRef.current[index] = el}
                                 className="sport-phones-container__text-container">
                                <h4 className="s-p-c-text-container__title">
                                    {phone.title}
                                </h4>
                                <p className="s-p-c-text-container__description">
                                    {phone.description}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>


            </div>
        </section>
    )
}

export default SportSection;