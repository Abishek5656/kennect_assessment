import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import  { userLogout } from "../store/slice/userSlice.js"
import { useDispatch } from "react-redux";

const Header = () => {
     const navigate = useNavigate();
      const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    

    const handleLogout = async () => {
        dispatch(userLogout())
        navigate("/login")
    };

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
                        <p
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </p>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
