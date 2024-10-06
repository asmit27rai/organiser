import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Edit } from "lucide-react";

import user_0 from "/user.svg";
import user_1 from "/user_1.svg";
import user_2 from "/user_2.svg";
import user_3 from "/user_3.svg";
import user_4 from "/user_4.svg";
import user_5 from "/user_5.svg";
import user_6 from "/user_6.svg";
import user_7 from "/user_7.svg";

export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newAvatar, setNewAvatar] = useState(user?.image);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setNewName(user.name);
      setNewAvatar(user.image);
    }
  }, [user]);

  const handleNameEdit = () => setIsEditingName(!isEditingName);
  const handleAvatarEdit = () => setIsEditingAvatar(!isEditingAvatar);
  const handleAvatarSelect = (avatarPath: string) => {
    setNewAvatar(avatarPath);
    setIsEditingAvatar(false);
  };

  const handleChanges = async () => {
    setIsSaving(true);
    try {
      await updateUser({ name: newName, image: newAvatar });
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        Profile
      </h1>

      <div className="relative group">
        {isEditingAvatar ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {[
                user_0,
                user_1,
                user_2,
                user_3,
                user_4,
                user_5,
                user_6,
                user_7,
              ].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`User ${index}`}
                  className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                    newAvatar === avatar
                      ? "scale-110 border-2 border-blue-100 rounded"
                      : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
          </div>
        ) : (
          <img
            src={newAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-zinc-900 dark:border-zinc-100 mb-2"
          />
        )}
        <button
          onClick={handleAvatarEdit}
          className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-700 rounded-full group-hover:opacity-100 opacity-0 transition-opacity"
        >
          <Edit size={18} className="text-zinc-900 dark:text-zinc-100" />
        </button>
      </div>

      <div className="relative group flex flex-col items-center">
        {isEditingName ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleNameEdit}
            className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-100 border-b border-gray-500 bg-transparent focus:outline-none"
            autoFocus
          />
        ) : (
          <h2
            className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:cursor-pointer group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
            onClick={handleNameEdit}
          >
            {newName}
          </h2>
        )}
        <button
          onClick={handleNameEdit}
          className="absolute right-0 top-0 p-1 bg-white dark:bg-gray-700 rounded-full group-hover:opacity-100 opacity-0 transition-opacity"
        >
          <Edit size={18} className="text-zinc-900 dark:text-zinc-100" />
        </button>
      </div>

      <h3 className="text-blue-900">{user?.email}</h3>

      <button
        className={`mt-4 ${
          isSaving ? "bg-gray-400" : "bg-red-500"
        } text-white px-4 py-2 rounded-lg`}
        onClick={handleChanges}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};
