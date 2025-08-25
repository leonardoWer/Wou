export const linksData = {
    email: "name89213126414@gmail.com",
    vk: "https://vk.ru/leonardo_wer",
    tg: "https://t.me/leonardo_wer",
    git: "https://github.com/leonardoWer",
    portfolio: "https://github.com/leonardoWer/Portfolio_Levakhin_Lev",
}

export const contactLinkElementsData = [
    {
        title: "Vk",
        onClick: {
            link: linksData.vk,
            hoverTitle: "Visit dev on Vk"
        },
    },
    {
        title: "Telegram",
        onClick: {
            link: linksData.tg,
            hoverTitle: "Visit dev on Telegram"
        },
    },
    {
        title: "GitHub",
        onClick: {
            link: linksData.git,
            hoverTitle: "Visit dev on GitHub"
        },
    },
    {
        title: "Portfolio",
        onClick: {
            link: linksData.portfolio,
            hoverTitle: "Visit dev portfolio"
        },
    }
];

export const navigationLinkElementsData = [
    {
        title: "Home",
        onClick: {
            scrollTo: "heroSection"
        }
    },
    {
        title: "About",
        onClick: {
            scrollTo: "aboutSection"
        }
    },
    {
        title: "Sport",
        onClick: {
            scrollTo: "sportSection"
        }
    },
    {
        title: "Plans",
        onClick: {
            scrollTo: "plansSection"
        }
    },
    {
        title: "Features",
        onClick: {
            scrollTo: "featuresSection"
        }
    },
    {
        title: "Contacts",
        onClick: {
            scrollTo: "contactsSection"
        }
    },
];