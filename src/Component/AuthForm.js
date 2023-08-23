import React from 'react';
import google from "../Image/google.png"
const AuthForm = () => {
    const googleAuth = () =>{
        window.open(
            "http://localhost:8080/auth/google/callback",
            "_self"
        )
    }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">Email Address</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring focus:border-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring focus:border-blue-300"
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <span> <button onClick={googleAuth}><img className="pt-2 w-10 h-10" src={google} alt="Sign IN with Google" /></button></span>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
