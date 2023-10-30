import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Login } from "../Login/Login";
import { useAuthValue } from "../../contexts/AuthContext";
import { TagsDropdown } from "../TagsDropdown/TagsDropdown";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ profileDropdown, setProfileDropdown] = useState(false);
  const [ tagsDropDown, setTagsDropdown] = useState(false);

  const { currentUser, handleSignOut } = useAuthValue();
 
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    
	<nav className="relative bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
		<div className="flex items-center gap-8 ">
        <NavLink to="/" className="text-white text-2xl font-bold italic">
          Petaloso
        </NavLink>
        <div className="lg:flex hidden space-x-4">
        <NavLink to="/" activeClassName="text-blue-400" className="text-white hover:border-b border-b-blue-400">
            Home
          </NavLink>
          <NavLink to="/submit" activeClassName="text-blue-400" className="text-white hover:border-b border-b-blue-400">
            Submit
          </NavLink>
          <div  className=" group"> 
		    
            <NavLink activeClassName="text-blue-400"  onClick={() => setTagsDropdown(!tagsDropDown)} className="text-white cursor-pointer hover:border-b border-b-blue-400">Tags</NavLink>
            {tagsDropDown && (
              <TagsDropdown/>
            )}
          </div>
          <NavLink to="/about" activeClassName="text-blue-400" className="text-white hover:border-b border-b-blue-400">
            About
          </NavLink>
        </div>
		</div>
        
        <div className="flex items-center space-x-4">
        <div className="lg:hidden flex items-center">
          {/* Burger icon */}
          <button
            className="text-white text-3xl lg:hidden block"
          >
            &#8801;
          </button>
        </div>
          <input
            className="hidden lg:block bg-gray-200 text-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Search"
          />
          {currentUser? (
             <div className="relative">
               <button onClick={() => setProfileDropdown(!profileDropdown)} type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                 <span class="absolute -inset-1.5"></span>
                 <span class="sr-only">Open user menu</span>
                 <img class="h-8 w-8 rounded-full" src={currentUser.photoURL} alt="" />
               </button>
               {profileDropdown && (
                  <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <Link to="/profile" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</Link>
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
