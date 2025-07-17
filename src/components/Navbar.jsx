import { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate('/login');
  };


  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-green-600">EduManage</span>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-green-500 text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                Features
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                About
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              id="login-button"
              aria-haspopup="true"
              onClick={handleClick}
              variant="outlined"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Sign In
            </Button>
            
          </div>
        </div>
      </div>
    </nav>
  );
}