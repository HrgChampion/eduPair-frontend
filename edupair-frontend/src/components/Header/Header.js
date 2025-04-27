import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-4 shadow-md fixed top-0 left-0 right-0 z-50"  >
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          EduPair 🚀
        </h1>

        {/* For desktop, show Logout if logged in */}
        {token && (
          <div className="relative">
            <button 
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
              onClick={toggleDropdown}
            >
              Profile
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                <ul>
                  <li>
                    <button 
                      onClick={handleEditProfile} 
                      className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-lg">
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
