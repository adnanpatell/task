import React from 'react';

const AuthForm = () => {
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
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
