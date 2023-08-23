import React from 'react';
const Home = (userDetails) => {
    const user = userDetails.user;
    const logout = () =>{
        window.open(
            "http://localhost:8080/auth/logout",
            "_self"
        )
    }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold">Email Address</label>
            <input
              type="email"
              defaultValue={user.email}
              className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring focus:border-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>
          <img src={user.picture} alt='User Profile'/>
          
         
          <span> <button onClick={logout}>Logout</button></span>
        </form>
      </div>
    </div>
  );
};

export default Home;
