import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('telegram-theme') || 'light');

    useEffect(() => {
        localStorage.setItem('telegram-theme', theme);
        document.documentElement.style.setProperty('--chat-bg', theme === 'light' ? '#338fec' : '#160918');
        document.documentElement.style.setProperty('--side-bg', theme === 'light' ? '#fff' : '#212121');
        document.documentElement.style.setProperty('--chat-menu-bg', theme === 'light' ? '#3390ec' : '#8774e1');

        if (theme === 'dark') {
            document.documentElement.classList.add('text-[#fff]');
            document.documentElement.classList.remove('text-[#000]');
        } else {
            document.documentElement.classList.remove('text-[#fff]');
            document.documentElement.classList.add('text-[#000]');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node
};

export default ThemeProvider;
