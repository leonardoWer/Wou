import "./Footer.css"
import BaseButton from "s/components/buttons/BaseButton.jsx";

function Footer() {
    return (
        <section id="contactsSection">

            <div className="contacts__top">
                <img src="logo/logo-horizontal.svg" alt="logo" className="contacts-top__logo"/>

                <div className="contacts-top__button-container">
                    <BaseButton title="Get app" type={"bg"}/>
                </div>

            </div>

            <footer>
                <div className="footer-container">

                    <div className="footer__logo-container">
                        <img src="logo/logo.svg" alt="logo"/>
                    </div>

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
                            vk
                        </li>
                        <li className="footer-list__item">
                            tg
                        </li>
                        <li className="footer-list__item">
                            git
                        </li>
                        <li className="footer-list__item">
                            p
                        </li>
                    </ul>

                </div>
            </footer>

        </section>
    )
}

export default Footer;