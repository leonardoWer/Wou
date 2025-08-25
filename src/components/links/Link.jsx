import "s/components/buttons/BaseButton.css"

import React from 'react';

import gsap from 'gsap';
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

function BaseLink({children, onClick, className, type}, ref) {

    // const navigate = useNavigate();

    let linkProps = {
        className: className ? className : '',
    };
    type ? linkProps.className += (type) : "";

    if (onClick && typeof onClick === 'object') {

        const handlePageScroll = (event) => {
            event.preventDefault(); // Отменяем стандартное поведение

            const targetId = onClick.scrollTo;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                gsap.to(window, {
                    duration: 0.8,
                    ease: "power3.inOut",
                    scrollTo: {
                        y: targetElement,
                    },
                });
            } else {
                console.warn("Can't find element with id: " + targetId);
            }
        }

        const handlePageNavigation = (event) => {
            event.preventDefault();
            // navigate(onClick.page);
        }

        if (onClick.link) {
            // Внешняя ссылка
            linkProps.href = onClick.link;
            linkProps.target = onClick.target || "_blank";
            linkProps.rel = onClick.rel || "noopener noreferrer";
            linkProps.title = onClick.hoverTitle || "";
        } else if (onClick.scrollTo) {
            linkProps.href = `#${onClick.scrollTo}`;
            linkProps.onClick = handlePageScroll;
        } else if (onClick.page) {
            linkProps.href = `#${onClick.page}`;
            linkProps.onClick = handlePageNavigation;
        } else if (onClick.href) {
            linkProps.href = onClick.href;
        }
    } else {
        console.warn("onClick must be an object!")
    }

    return (
        <a {...linkProps} ref={ref}>
            {children}
        </a>
    );
}

export default React.forwardRef(BaseLink);