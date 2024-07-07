import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ToggleTheme from './ToggleTheme';
import { HiBars3 } from 'react-icons/hi2';

const Menubar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menubarRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menubarRef.current && !menubarRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menubarRef]);

    return (
        <div className={`p-2 h-14 bg-sideBG`}>
            {/* Sandwich Menu Icon */}
            <div className="flex items-center gap-2">
                <div ref={menubarRef}>
                    <HiBars3 className="w-11 h-11 text-2xl cursor-pointer rounded-full p-2 hover:bg-[#2b2b2b75] flex-1" onClick={toggleMenu} />
                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className={`absolute top-12 left-2 w-80 mt-1 bg-sideBG shadow-sm shadow-gray-600 rounded-lg select-none`}>
                            <ul>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Saved Messages</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Archived Chats</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">My Stories</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Contacts</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Settings</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 flex items-center justify-between gap-3">Dark Mode <ToggleTheme /></li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Animations</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Telegram Features</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Report Bug</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Switch to A version</li>
                                <li className="py-2 px-4 hover:bg-[#9e9ea4e9] transition-all duration-700 cursor-pointer">Install App</li>
                            </ul>
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full flex-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className={`bg-transparent w-full border border-gray-400 rounded-full py-1 px-4 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 `}
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Menubar;
