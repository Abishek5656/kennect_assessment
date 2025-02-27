import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
            {/* Search Box */}
            <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 w-1/3 rounded-lg text-black outline-none"
            />

            {/* Profile Icon */}
            <div className="relative">
                <FaUserCircle
                    size={32}
                    className="cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                />

                {/* Dropdown Modal */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg p-2">
                        <ul>
                            <li className="p-2 hover:bg-gray-200 cursor-pointer">My Posts</li>
                            <li className="p-2 hover:bg-gray-200 cursor-pointer">Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
