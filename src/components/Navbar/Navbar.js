import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import { Login } from "../Login/Login";
import { useAuthValue } from "../../contexts/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ profileDropdown, setProfileDropdown] = useState(false);

  const { currentUser, handleSignOut } = useAuthValue();
 

  const handleProfileDropdown = () => {
    if(profileDropdown){
      setProfileDropdown(false) } else {
      setProfileDropdown(true)
      }
    }
  

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
        <div className="hidden lg:flex items-center space-x-4">
          <input
            className="bg-gray-200 text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Search"
          />
          {currentUser? (
             <div className="relative">
               <button onClick={handleProfileDropdown} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                 <span class="absolute -inset-1.5"></span>
                 <span class="sr-only">Open user menu</span>
                 <img class="h-8 w-8 rounded-full" src={currentUser.photoURL} alt="" />
               </button>
               {profileDropdown && (
                  <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                  <a onClick={handleSignOut} href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>
                   
               )}
                 </div>

          ): (
            
            <>
          <Button onClick={openModal} title="Sign in" />
          <Button title="Sign up" />
          </>
          )}
          
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
