import { LogIn, NotebookPen, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Button } from "../../components/ui/button";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  console.log(user);

  return (
    <nav className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-900 ">
      <Link to="/" className="flex items-center space-x-2">
        <NotebookPen size={24} />
        <span className="text-xl font-bold">Organiser</span>
      </Link>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to={`/profile/${user.id}`} className="flex items-center space-x-2">
            {user.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border border-black"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
              )}
            </Link>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <Link to="/login" className="flex items-center space-x-2">
            <LogIn size={24} />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
