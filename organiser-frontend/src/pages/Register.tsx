import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

import user from "/user.svg";
import user_1 from "/user_1.svg";
import user_2 from "/user_2.svg";
import user_3 from "/user_3.svg";
import user_4 from "/user_4.svg";
import user_5 from "/user_5.svg";
import user_6 from "/user_6.svg";
import user_7 from "/user_7.svg";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, image);
      navigate("/");
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  const handleImageSelect = (svgPath: string) => {
    setImage(svgPath);
  };

  return (
    <Card className="mx-auto mt-8 w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Register
        </CardTitle>
        <CardDescription className="text-zinc-600 dark:text-zinc-400">
          Create a new account to join the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Profile Image
            </label>
            <div className="flex overflow-x-auto mt-2 space-x-2 pb-2">
              <img
                src={user}
                alt="User"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user)}
              />
              <img
                src={user_1}
                alt="User 1"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_1 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_1)}
              />
              <img
                src={user_2}
                alt="User 2"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_2 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_2)}
              />
              <img
                src={user_3}
                alt="User 3"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_3 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_3)}
              />
              <img
                src={user_4}
                alt="User 4"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_4 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_4)}
              />
              <img
                src={user_5}
                alt="User 5"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_5 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_5)}
              />
              <img
                src={user_6}
                alt="User 6"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_6 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_6)}
              />
              <img
                src={user_7}
                alt="User 7"
                className={`w-16 h-16 cursor-pointer transition-transform duration-200 ${
                  image === user_7 ? "scale-110 border-2 border-blue-100 rounded" : ""
                }`}
                onClick={() => handleImageSelect(user_7)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
