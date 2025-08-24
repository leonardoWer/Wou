import "./TopMenu.css"

import {useTheme} from "s/providers/ThemeProvider.jsx";

import BaseButton from "s/components/buttons/BaseButton.jsx";

function TopMenu() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="top-menu">
            <div className="top-menu__inner">
                <div className="top-menu__left">
                    <img src="logo/logo.svg" alt="logo" className="top-menu__logo"/>
                </div>

                <div className="top-menu__center">
                    <ul className="nav-list">
                        <li className="nav-list__item">about</li>
                        <li className="nav-list__item">app</li>
                        <li className="nav-list__item">contacts</li>
                    </ul>
                </div>

                <div className="top-menu__right">
                    <BaseButton title={"Get App"} type={"blue-bg"}/>
                    <BaseButton title={theme} type={"no-bg"} onClick={toggleTheme} />
                </div>
            </div>
        </nav>
    )
}

export default TopMenu;