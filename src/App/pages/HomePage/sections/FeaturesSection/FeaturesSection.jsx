import "./FeaturesSection.css"
import {useRef} from "react";

function FeaturesSection() {

    const challengesData ={
        title: "Челленджи",
        description: "Выполняйте задания с нарастающим уровнем сложности и получайте уникальные достижения, " +
            "которые отображаются в вашем профиле, демонстрируя ваш прогресс и упорство",
        img: "img/pages_mobile/challenges.png",
    };

    const purposeData = {
        title: "Цель",
        description: "Установите конкретную цель, которая будет мотивировать на главном экране",
        img: "img/pages_screenshots/purpose.png",
    };

    const achievementsData = {
        title: "Достижения и персонализация",
        description: "Настраивайте каждый элемент приложения под себя",
        img: [
            "img/icons/achievements/bronze_plank_achievement.png",
            "img/icons/achievements/silver_plank_achievement.png",
            "img/icons/achievements/gold_plank_achievement.png",
            "img/icons/achievements/diamond_plank_achievement.png",
            "img/icons/achievements/emerald_plank_achievement.png",
            "img/icons/achievements/ruby_plank_achievement.png",
        ],
    };

    const contentContainerRef = useRef(null);
    const gridContainerContainerRef = useRef(null);

    const gridContainersRef = useRef([]);


    return (
        <section id="featuresSection">
            <div className="features-content-container"
            ref={contentContainerRef}>

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

                    <div className="features__grid">

                        <div className="features__img-container"
                            ref={(el) => gridContainersRef[0] = el}>
                            <div className="features__img-wrapper">
                                <img src={challengesData.img} alt={challengesData.title + " screenshot"}/>
                            </div>

                            <div className="f-i-c__text-container">
                                <h4 className="features-grid__title">
                                    {challengesData.title}
                                </h4>
                                <p className="features-grid__description">
                                    {challengesData.description}
                                </p>
                            </div>
                        </div>

                        <div className="features__purpose-container"
                             ref={(el) => gridContainersRef[1] = el}>

                            <div className="f-i-c__text-container">
                                <h4 className="features-grid__title">
                                    {purposeData.title}
                                </h4>
                                <p className="features-grid__description">
                                    {purposeData.description}
                                </p>
                            </div>

                            <img src={purposeData.img} alt={purposeData.title + " screenshot"}/>
                        </div>

                        <div className="features__achievements-container"
                             ref={(el) => gridContainersRef[2] = el}>
                            <h4 className="features-grid__title">
                                {achievementsData.title}
                            </h4>
                            <div className="f-a-c__achievements-grid">
                                {achievementsData.img.map((achievement, i) => (
                                    <img src={achievement}
                                         alt={achievementsData.title + " icon " + i}
                                         className="f-a-c__achievement-img"
                                         key={i}
                                    />
                                ))}
                            </div>
                            <p className="features-grid__description">
                                {achievementsData.description}
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default FeaturesSection;