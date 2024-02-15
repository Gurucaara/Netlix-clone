import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constant";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store.config.lang);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // Navigating from here.
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // return a function and unsubscribe when component unmount.
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen py-2 px-8 z-10 sm:px-10 lg:px-16 bg-gradient-to-b from-black bg-black bg-opacity-40   ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <img src={LOGO} alt="Netflix Logo" className="w-36 sm:w-40 lg:w-44" />
        {user && (
          <div className="relative">
            <div className="flex items-center ">
              {showGptSearch && (
                <select
                  className="p-2 m-2 bg-gray-900 text-white"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                className="py-2 px-4 mx-8 bg-purple-800 text-white rounded-lg"
                onClick={handleGptSearchClick}
              >
                {showGptSearch ? "Homepage" : lang[langKey].gptSearch}
              </button>
              <div
                className="relative cursor-pointer flex items-center"
                onClick={toggleDropdown}
              >
                {user ? (
                  <img
                    // src={user?.photoURL ||  USER_AVATAR }
                    src={user?.photoURL}
                    alt="usericon"
                    className="w-10 h-10"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
                )}
                <div
                  className={`cursor-pointer ml-2 p-1 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  onClick={toggleDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform"
                    viewBox="0 0 20 20"
                    fill="white"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15a1 1 0 0 1-.707-.293l-5-5a1 1 0 0 1 1.414-1.414L10 12.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-.707.293z"
                    />
                  </svg>
                </div>
                {isDropdownOpen && (
                  <div className="absolute top-full right-1 mt-2 w-40 bg-black text-white border border-gray-200 rounded-md shadow-lg">
                    <ul>
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                        onClick={handleSignOut}
                      >
                        {lang[langKey].signOut}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
