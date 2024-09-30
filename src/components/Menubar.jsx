import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ToggleTheme from "./ToggleTheme";
import { HiBars3 } from "react-icons/hi2";
import { LuBookmark, LuSettings } from "react-icons/lu";
import { RiInboxArchiveLine } from "react-icons/ri";
import { TbCircleDashed, TbSquareLetterA } from "react-icons/tb";
import { MdAnimation, MdOutlinePersonOutline } from "react-icons/md";
import { RxMoon } from "react-icons/rx";
import { BsQuestionCircle } from "react-icons/bs";
import { GoBug } from "react-icons/go";
import { FiPlusCircle } from "react-icons/fi";

const Menubar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const menubarRef = useRef(null);

	const toggleMenu = () => {
		setShowMenu((prevState) => !prevState);
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
		<div className={`py-2 pr-3 h-14 bg-sideBG`}>
			{/* Sandwich Menu Icon */}
			<div className="flex items-center gap-2">
				<div ref={menubarRef}>
					<HiBars3
						className="w-11 h-11 text-2xl cursor-pointer rounded-full p-2 hover:bg-[#2b2b2b75] transition-all duration-500 flex-1"
						onClick={toggleMenu}
					/>
					{/* Dropdown Menu */}
					{showMenu && (
						<div
							className={`absolute top-12 left-2 w-80 mt-1 bg-sideBG shadow-sm shadow-gray-600 rounded-lg select-none transition-all duration-300 transform origin-top-left ${
								showMenu
									? "animate-slide-in"
									: "animate-slide-out"
							}`}
						>
							<ul className="p-1 space-y-1">
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<LuBookmark />
									Saved Messages
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<RiInboxArchiveLine /> Archived Chats
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<TbCircleDashed />
									My Stories
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<MdOutlinePersonOutline />
									Contacts
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<LuSettings />
									Settings
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 flex items-center justify-between gap-3 rounded-lg">
									<span className="flex items-center gap-6">
										<RxMoon />
										Dark Mode
									</span>{" "}
									<ToggleTheme />
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<MdAnimation />
									Animations
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<BsQuestionCircle />
									Telegram Features
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<GoBug />
									Report Bug
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<TbSquareLetterA />
									Switch to A version
								</li>
								<li className="py-1 px-4 hover:bg-[#e5e5e6b9] transition-all duration-700 cursor-pointer rounded-lg flex items-center gap-6">
									<FiPlusCircle />
									Install App
								</li>
							</ul>
						</div>
					)}
				</div>

				{/* Search Bar */}
				<div className="relative w-full flex-1">
					<input
						type="text"
						placeholder="Search"
						className={`bg-transparent w-full border border-gray-600 rounded-full py-2 px-5 pl-8 focus:outline-none focus:border-none focus:ring-1 focus:ring-telegramChange `}
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
