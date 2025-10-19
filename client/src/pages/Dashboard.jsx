import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex">
      {/* Sidebar */}
      <div className="w-1/6 bg-white shadow-2xl h-screen flex flex-col">
        {/* Profile info */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded m-4 shadow-md">
          <div className="relative">
            <img
              src="https://scontent.fccu32-1.fna.fbcdn.net/v/t39.30808-1/437942922_122130784034229589_2608333589194260663_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=e99d92&_nc_ohc=n_Hxz15FWmoQ7kNvwGw0eSn&_nc_oc=AdnmPksfKzib_Y3rl7A1KhPrNzCGiDx48wierdA1oQ3TBmNc38om6rDtVxZ5TgbQsc4&_nc_zt=24&_nc_ht=scontent.fccu32-1.fna&_nc_gid=3yY-V8PII2usiLr6HoiMoA&oh=00_AfcOc05gTtTdruur1dD14q6zf9iH2bC2N3ct8OfJ79keFg&oe=68FAA590"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md object-cover border-2 border-blue-400"
              alt="Profile"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <p className="mt-2 text-gray-800 font-semibold text-sm md:text-base">
            Antanu Dutta
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-2">
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded transition-colors duration-200
                     ${
                       isActive
                         ? "bg-blue-500 text-white"
                         : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                     }`
                  }
                >
                  <span className="ml-2 font-medium">{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-5/6 h-screen overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
