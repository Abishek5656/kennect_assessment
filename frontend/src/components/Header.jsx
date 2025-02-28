import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BASE } from "../constant/index.js"; // Ensure BASE is correctly defined
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = Cookies.get("accessToken"); 

            const res = await fetch(`${BASE}/user/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: "include",
            });

            const data = await res.json();

            if (data.success) {
                Cookies.remove("accessToken"); 
                localStorage.removeItem("username");
                localStorage.removeItem("token")
    
                window.location.href = "/login"; 
            }
           
        } catch (error) {
            console.error("Logout Error:", error);
        }
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
