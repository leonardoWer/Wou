import "./PlansSection.css"

import {useRef, useEffect, useState} from "react";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

function PlansSection() {

    const plansData = [
        {
            title: "Правильное питание",
            description: "Lorem 1212312 123dsf ssefwe",
            img: "img/pages_screenshots/recipes.png",
            icon: "img/icons/healthy_food_icon.png"
        },
        {
            title: "Мой прогресс",
            description: "Lorem ipsum solom dor 123dsf ssefwe",
            img: "img/pages_screenshots/recipes.png",
            icon: "img/icons/healthy_food_icon.png"
        },
        {
            title: "Рекорды",
            description: "12312 q we edfwe qweqfwe",
            img: "img/pages_screenshots/recipes.png",
            icon: "img/icons/records_icon.png"
        },
    ]

    const contentContainerRef = useRef(null);
    const topContainerRef = useRef(null);

    const menuItemsRef = useRef([]);
    const rightItemsRef = useRef([]);
    const titleTextElementsRef = useRef([]);
    const descrTextElementsRef = useRef([]);
    const imgContainersRef = useRef([]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const contentContainer = contentContainerRef.current;
        const topContainer = topContainerRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: topContainer,
                start: "bottom bottom",
                endTrigger: contentContainer,
                end: "bottom bottom",
                pin: topContainer,
                scrub: 1,
            }
        });

        // Анимация для каждого элемента справа
        plansData.forEach((_, index) => {
            const titleTextElement = titleTextElementsRef.current[index];
            const descriptionTextElement = descrTextElementsRef.current[index];
            const imgContainer = imgContainersRef.current[index];

            if (!titleTextElement || !imgContainer) return;

            // Начальное состояние
            if (index === 0) {
                // Первый элемент уже виден
                gsap.set([titleTextElement, descriptionTextElement], { opacity: 1, y: 0 });
                gsap.set(imgContainer, { opacity: 1, xPercent: 0 });
            } else {
                gsap.set([titleTextElement, descriptionTextElement], { opacity: 0, y: 100 });
                gsap.set(imgContainer, { opacity: 0, xPercent: 100 });
            }

            // Анимация появления
            if (index !== 0) {
                tl.to([titleTextElement, descriptionTextElement], {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "<")
                    .to(imgContainer, {
                        opacity: 1,
                        xPercent: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        onStart: () => {
                            setActiveIndex(index);
                        },
                        onReverseComplete: () => {
                            setActiveIndex(index - 1);
                        },
                    }, "<")
            }

            // Анимация исчезновения
            if (index < plansData.length - 1) {
                tl.to([titleTextElement, descriptionTextElement], {
                    opacity: 0,
                    y: -50,
                    duration: 0.6,
                    ease: "power2.in"
                }, `+=1`)
                    .to(imgContainer, {
                        opacity: 0,
                        xPercent: -100,
                        duration: 0.6,
                        ease: "power2.in",
                    }, "<")
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // useEffect для переключения активного класса меню
    useEffect(() => {
        const menuItems = menuItemsRef.current.filter(el => el);

        // Убираем активный класс у всех элементов
        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        // Добавляем активный класс текущему элементу
        if (menuItems[activeIndex]) {
            menuItems[activeIndex].classList.add('active');
        }

    }, [activeIndex]);

    return (
        <section id="plansSection">
            <div className="plans-content-container" ref={contentContainerRef}>

                <div className="plans-top-container" ref={topContainerRef}>

                    <div className="section-text-container">
                        <div className="section-title-text">
                            Становитесь лучше с Wou
                        </div>
                        <div className="section-description-text">
                            Планируйте диету, отслеживайте прогресс, сохраняйте рекорды.
                            Всё для того, чтобы становится лучше
                        </div>
                    </div>

                    <div className="plans-top__content-container">

                        <div className="plans-top-content-container__left">
                            <aside className="plans-menu">
                                {plansData.map((item, index) => (
                                    <div className={"plans-menu__item"}
                                         key={index}
                                         ref={(el) => menuItemsRef.current[index] = el}>
                                        <img className="plans-menu-item__icon" src={item.icon} alt={item.title + " icon"}/>
                                        <h4 className="plans-menu-item__title">
                                            {item.title}
                                        </h4>
                                    </div>
                                ))}
                            </aside>
                        </div>

                        <div className="plans-top-content-container__right">
                            {plansData.map((item, index) => (
                                <div className={"p-t-c-container-right__item"}
                                     key={index}
                                     ref={(el) => rightItemsRef.current[index] = el}>

                                    <h2 className="p-t-c-container-right-item__title"
                                        ref={(el) => titleTextElementsRef.current[index] = el}>
                                        {item.title}
                                    </h2>

                                    <div className="p-t-c-container-right-item__img-container">
                                        <div className="p-t-c-container-right-item__img-container-wrapper"
                                             ref={(el) => imgContainersRef.current[index] = el}>
                                            <img src={item.img} alt={item.title + " screenshot"}/>
                                        </div>
                                    </div>

                                    <p className="p-t-c-container-right-item__description"
                                        ref={(el) => descrTextElementsRef.current[index] = el}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>
        </section>
    )
}

export default PlansSection;