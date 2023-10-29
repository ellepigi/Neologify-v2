import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import { Login } from "../Login/Login";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    
	<nav className="relative bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
		<div className="flex items-center gap-8 ">
        <NavLink to="/" className="text-white text-2xl font-bold italic">
          Petaloso
        </NavLink>
        <div className="lg:flex hidden space-x-4">
          <NavLink to="/submit" className="text-white">
            Submit
          </NavLink>
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className=" group"
          > 
		    
            <NavLink to="/tags"><span className="text-white cursor-pointer">Tags</span></NavLink>
            {isOpen && (
              <div className="absolute left-0 top-full h-32 w-full bg-white py-2 px-4 shadow-md">
                {/* Contenuto del dropdown */}
                <a href="/tags/tag1" className="block text-gray-800 hover:text-blue-600">
                  Tag 1
                </a>
                <a href="/tags/tag2" className="block text-gray-800 hover:text-blue-600">
                  Tag 2
                </a>
                <a href="/tags/tag3" className="block text-gray-800 hover:text-blue-600">
                  Tag 3
                </a>
              </div>
            )}
          </div>
          <NavLink to="/about" className="text-white">
            About
          </NavLink>
        </div>
		</div>
        <div className="lg:hidden flex items-center">
          {/* Burger icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-3xl lg:hidden block"
          >
            &#8801;
          </button>
        </div>
        <div className="hidden lg:flex space-x-4">
          <input
            className="bg-gray-200 text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Search"
          />
          <Button onClick={openModal} title="Sign in" />
          <Button title="Sign up" />
        </div>
      </div>
    </nav>

    <Login 
    isOpen={isModalOpen}
    onClose={closeModal}
    />
    </>
  );
};
