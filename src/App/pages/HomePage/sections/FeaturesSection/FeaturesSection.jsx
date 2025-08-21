import "./FeaturesSection.css"
import {useRef} from "react";

function FeaturesSection() {

    // TODO: add actual photo and icons
    const featuresData = [
        {
            title: "Челленджи",
            description: "Лорем 40",
            img: "img/pages_mobile/challenges.png",
            icon: "img/icons/challenges_icon.png",
        },
        {
            title: "Цель",
            description: "Задайте себе цель, которая будет мотивировать вас на главном экране. " +
            "Это дополнительный инструмент для отслеживания прогресса",
            img: "img/pages_mobile/challenges.png",
            icon: "img/icons/challenges_icon.png",
        },
        {
            title: "Персонализация",
            description: "Подстраивайте под себя каждый элемент: " +
            "Тему, уведомления, напоминания о тренировках",
            img: "img/pages_mobile/challenges.png",
            icon: "img/icons/challenges_icon.png",
        },
    ]

    const contentContainerRef = useRef(null);
    const topContainerRef = useRef(null);
    const gridContainerContainerRef = useRef(null);

    const imgElementsDataRef = useRef([]);
    const titleTextElementsDataRef = useRef([]);
    const titleIconElementsDataRef = useRef([]);
    const descriptionElementsDataRef = useRef([]);


    return (
        <section id="featuresSection">
            <div className="features-content-container"
            ref={contentContainerRef}>
                <div className="features__top"
                ref={topContainerRef}>

                    <div className="features__text-container">
                        <div className="features-text-container__line">
                            <span className="features-line__text">
                                Приложение
                            </span>
                            <img src="img/icons/ruby_plank_achievement.png" alt="inline-icon" className="features-line__icon" data-scale/>
                            <span className="features-line__text">
                                наполненное
                            </span>
                        </div>
                        <div className="features-text-container__line">
                            <img src="img/icons/records_icon.png" alt="inline-icon" className="features-line__icon"/>
                            <span className="features-line__text">
                                Полезными функциями
                            </span>
                            <img src="img/icons/workouts_plan_icon.png" alt="inline-icon" className="features-line__icon"/>
                        </div>
                        <div className="features-text-container__line">
                            <span className="features-line__text">
                                Которые делают
                            </span>
                            <img src="logo/logo-bg.svg" alt="inline-icon" className="features-line__icon"/>
                            <span className="features-line__text">
                                Разницу
                            </span>
                        </div>
                    </div>

                    <div className="features-top__content-container"
                    ref={gridContainerContainerRef}>

                        <div className="features-top__grid">

                            <div className="features__img-container">
                                {featuresData.map((item, index) => (
                                    <div className="features__img-wrapper"
                                         key={index}
                                         ref={(el) => imgElementsDataRef.current[index] = el}>
                                        <img src={item.img} alt={item.title + " screenshot"}/>
                                    </div>
                                ))}
                            </div>

                            <div className="features__title-container">
                                {featuresData.map((item, index) => (
                                    <div className="features-title-container__content-container"
                                        key={index}>
                                        <img src={item.icon}
                                             alt={item.title + " icon"}
                                             className="features-title-container__icon"
                                             ref={(el) => titleIconElementsDataRef.current[index] = el}/>

                                        <h4 className="features-title-container__title"
                                            ref={(el) => titleTextElementsDataRef.current[index] = el}>
                                            {item.title}
                                        </h4>
                                    </div>
                                ))}
                            </div>

                            <div className="features__description-container">
                                {featuresData.map((item, index) => (
                                    <p className="features-description-container__text"
                                        key={index}
                                        ref={(el) => descriptionElementsDataRef.current[index] = el}>
                                        {item.description}
                                    </p>
                                ))}

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default FeaturesSection;