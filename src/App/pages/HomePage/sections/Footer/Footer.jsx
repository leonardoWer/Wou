import "./Footer.css"
import BaseButton from "s/components/buttons/BaseButton.jsx";
import BaseLink from "s/components/links/Link.jsx";

function Footer() {
    return (
        <section id="contactsSection">

            <div className="contacts__top">
                <img src="logo/logo-horizontal.svg" alt="logo" className="contacts-top__logo"/>

                <div className="contacts-top__button-container">
                    <BaseButton title="Get app" type={"bg"}/>
                    <BaseLink children="Our GitHub" onClick={{link: "https://github.com/leonardoWer/Wou-android-app"}} type={"no-bg"}/>
                </div>
            </div>

            <footer>

                <div className="footer__top">

                    <div className="footer__logo-container">
                        <img src="logo/logo.svg" alt="logo"/>

                        <p className="footer__created-by-text">
                            Created by <a href="http://leonardoWer.github.io">leonardo Wer</a>
                        </p>
                    </div>

                    <div className="footer__links-container">
                        <ul className="footer__list">
                            <li className="footer-list__title">
                                Explore
                            </li>
                            <li className="footer-list__item">
                                Home
                            </li>
                            <li className="footer-list__item">
                                About
                            </li>
                            <li className="footer-list__item">
                                Sport
                            </li>
                            <li className="footer-list__item">
                                Plans
                            </li>
                            <li className="footer-list__item">
                                Features
                            </li>
                        </ul>

                        <ul className="footer__list">
                            <li className="footer-list__title">
                                Contacts
                            </li>
                            <li className="footer-list__item">
                                Vk
                            </li>
                            <li className="footer-list__item">
                                Telegram
                            </li>
                            <li className="footer-list__item">
                                GitHub
                            </li>
                            <li className="footer-list__item">
                                Portfolio
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>
                        © Wou 2024-{new Date().getFullYear()}. All rights reserved
                    </span>
                    <a>
                        Privacy policy
                    </a>
                </div>


            </footer>

        </section>
    )
}

export default Footer;