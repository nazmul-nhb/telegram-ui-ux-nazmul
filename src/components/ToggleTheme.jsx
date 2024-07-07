import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

const ToggleTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(
        theme === 'light'
            ? <FaToggleOff className='' />
            : <FaToggleOn className='' />);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => {
            setCurrentIcon(
                theme === 'light'
                    ? <FaToggleOff className='' />
                    : <FaToggleOn className='' />);
            setIsAnimating(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggler text-2xl md:text-3xl"
        >
            <span className={`inset-0 flex items-center justify-center ${isAnimating ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                {currentIcon}
            </span>
        </button>
    );
};

export default ToggleTheme;