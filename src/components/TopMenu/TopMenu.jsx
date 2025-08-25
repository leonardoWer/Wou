import "./TopMenu.css"

import {useEffect, useRef, useState} from "react";

import {useTheme} from "s/providers/ThemeProvider.jsx";

import BaseButton from "s/components/buttons/BaseButton.jsx";
import BaseLink from "s/components/links/Link.jsx";
import {DownloadAppLink} from "s/components/links/DownloadAppLink/DownloadAppLink.jsx";

import Logo from "s/assets/logo.svg?react"

import gsap from "gsap";

function TopMenu() {
    const {theme, toggleTheme} = useTheme();

    const dropdownData = [
        {
            title: "Sport",
            onClick: {scrollTo: "aboutSection"},
            icon: "img/icons/records_icon.png"
        },
        {
            title: "Plans",
            onClick: {scrollTo: "plansSection"},
            icon: "img/icons/workouts_plan_icon.png"
        },
        {
            title: "Features",
            onClick: {scrollTo: "featuresSection"},
            icon: "img/icons/challenges_icon.png"
        },
    ];

    return (
        <nav className="top-menu">
            <div className="top-menu__inner">
                <div className="top-menu__left">
                    <BaseLink
                        children={<Logo className="top-menu__logo"/>}
                        onClick={{scrollTo: "heroSection"}}
                    />
                </div>

                <div className="top-menu__center">
                    <ul className="nav-list">
                        <li className="nav-list__item">
                            <BaseLink children={"About"}
                                      onClick={{scrollTo: "aboutSection"}}
                            />
                        </li>
                        <NavItemWithDropdown dropdownData={dropdownData}/>
                        <li className="nav-list__item">
                            <BaseLink children={"Contacts"}
                                      onClick={{scrollTo: "contactsSection"}}
                            />
                        </li>
                    </ul>
                </div>

                <div className="top-menu__right">
                    <DownloadAppLink children={"Get App"} className="base-button " type={"blue-bg"}/>
                    <BaseButton title={theme} type={"no-bg"} onClick={toggleTheme}/>
                </div>
            </div>
        </nav>
    )
}

const NavItemWithDropdown = ({dropdownData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null); // Для отслеживания кликов вне компонента
    const dropdownMenuRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Появление меню
    useEffect(() => {
        const menuElement = dropdownMenuRef.current;

        if (!menuElement) return;

        // Анимация появления
        const showMenu = () => {
            gsap.to(menuElement, {
                opacity: 1,
                display: 'flex',
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        // Анимация скрытия
        const hideMenu = () => {
            gsap.to(menuElement, {
                opacity: 0,
                display: 'none',
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        // Запускаем анимацию в зависимости от состояния isOpen
        if (isOpen) {
            showMenu();
        } else {
            hideMenu();
        }

    }, [isOpen]);

    // Закрыть меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <li className="nav-list__item"
            ref={wrapperRef}>

            <span className="nav-item__text"
                  onClick={toggleDropdown}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={isOpen}>
                App <i className="fa fa-chevron-right nav-item__icon" aria-hidden="true"></i>
            </span>

            <ul className="dropdown-menu"
                ref={dropdownMenuRef}>
                {dropdownData.map((dropdownItem, index) => (
                    <li className="dropdown-menu__item"
                        key={index}>
                        <BaseLink
                            children={
                                <div className={"dropdown-item__inner"}>
                                    <img className="dropdown-item__icon"
                                        src={dropdownItem.icon}
                                        alt={dropdownItem.title + " icon"}
                                    />
                                    {dropdownItem.title}
                                </div>
                            }
                            onClick={dropdownItem.onClick}
                        />
                    </li>
                ))}
            </ul>

        </li>
    )
}

export default TopMenu;