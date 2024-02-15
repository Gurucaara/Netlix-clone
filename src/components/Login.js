import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMG_URL, USER_AVATAR } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleButtonClick = () => {
    // Validate the Form Data
    // checkValidData(email, password)
    // console.log(email.current.value);
    // console.log(password.current.value);

    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign In/ Sign Up Logic
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src={BG_IMG_URL}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className=" w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 rounded-md text-white bg-opacity-90"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="p-3 mb-4 bg-neutral-700 rounded-md w-full"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="p-3 mb-4 bg-neutral-700 rounded-md w-full "
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-3 mb-4 bg-neutral-700 rounded-md w-full"
        />
        <p className="text-red-600 font-bold text-lg py-2 mb-5 ">
          {errorMessage}
        </p>
        <button
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg w-full transition duration-300 mb-8"
          type="submit"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-neutral-600">
          {isSignInForm ? "New to Netflix ? " : "Already Registered ? "}
          <button
            className="text-red-600 hover:underline hover:text-red-700 cursor-pointer"
            onClick={toggleSignInForm}
            href=""
          >
            {isSignInForm ? " Sign Up Now." : " Sign In Now."}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
