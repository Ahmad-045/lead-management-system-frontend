import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = (props) => {
  const navigate = useNavigate();
  const [currentActiveLink, setcurrentActiveLink] = useState(true);

  const onClickNavigation = (url) => {
    navigate(url);
    setcurrentActiveLink(!currentActiveLink);
  };

  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex md:order-2">
          {props.loggedIn && (
            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              onClick={props.logoutHander}
            >
              Log Out
            </button>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          ></button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {props.loggedIn && (
            <ul className="flex flex-col p-4 gap-10 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
              <li className="flex gap-2 justify-center items-start">
                Welcome!!
              </li>
              <li className="flex justify-center items-center">
                <button
                  href="#"
                  className={`block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white ${
                    currentActiveLink
                      ? 'bg-gray-100 bg-transparent text-blue-700'
                      : ''
                  }`}
                  onClick={() => onClickNavigation('/lead')}
                >
                  Leads
                </button>
              </li>
              <li className="flex justify-center items-center">
                <button
                  onClick={() => onClickNavigation('/users')}
                  className={`block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white ${
                    currentActiveLink
                      ? ''
                      : 'bg-gray-100 bg-transparent text-blue-700'
                  }`}
                >
                  Users
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
