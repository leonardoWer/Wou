import "./FeaturesSection.css"

function FeaturesSection() {
    return (
        <section id="featuresSection">
            <div className="features-content-container">
                <div className="features__top">

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

                    <div className="features-top__content-container">

                        <div className="features-top__grid">

                            <div className="features__img-container">
                                <div className="features__img-wrapper">
                                    <img src="" alt=""/>
                                </div>
                            </div>

                            <div className="features__title-container">
                                <img src="" alt="" className="features-title-container__icon"/>

                                <h4 className="features-title-container__title"></h4>
                            </div>

                            <div className="features__description-container">
                                <p className="features-description-container__text">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, aut dolores eligendi fugit id ipsam nobis pariatur voluptas? Atque error, iste molestiae mollitia repudiandae voluptatem voluptatibus. Blanditiis neque omnis ut!
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default FeaturesSection;