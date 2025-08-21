import React, {useState, useEffect, createContext, useContext} from 'react';

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    // Функция для определения предпочтительной темы пользователя
    const getPreferredTheme = () => {
        // Проверяем, есть ли сохраненная тема в localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Если сохраненной темы нет, проверяем системные настройки
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    // Инициализация темы при первом рендере
    useEffect(() => {
        const initialTheme = getPreferredTheme();
        setTheme(initialTheme);
        document.body.className = initialTheme === 'dark' ? 'dark-theme' : '';
    }, []);

    // Функция для переключения темы
    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.body.className = newTheme === 'dark' ? 'dark-theme' : '';
            localStorage.setItem('theme', newTheme); // Сохраняем новую тему
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

// Хук для удобного использования контекста
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};