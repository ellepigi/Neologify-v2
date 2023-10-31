import React from 'react';
import { Link } from 'react-router-dom';

const Drawer = ({ closeDrawer, isOpen }) => {
  return (
    <div className="relative">
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow h-full transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-end p-4">
      <svg
                  onClick={closeDrawer}
                  className="fill-current text-black cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L9 7.586l3.293-3.293a1 1 0 111.414 1.414L10.414 9l3.293 3.293a1 1 0 01-1.414 1.414L9 10.414l-3.293 3.293a1 1 0 01-1.414-1.414L7.586 9 4.293 5.707a1 1 0 010-1.414z"
                  />
                </svg>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Menu</h2>
        <ul>
          <li>
            <Link to="/"
              className="block py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
            >
              Home
            </Link>
          </li>
          <li>
            <Link to="/submit"
              className="block py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
            >
              Submit
            </Link>
          </li>
          <li>
            <Link to="/tags"
              className="block py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
            >
              Tags
            </Link>
          </li>
          <li>
            <Link to="/about"
              className="block py-2 text-gray-700 hover:bg-gray-200 hover:text-gray-800"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};

export default Drawer;