import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export const Home: React.FC = () => (
  <div className="flex flex-wrap justify-center gap-8 p-10">
    <Link to="/fitness/:id" className="transform transition-transform hover:scale-105 hover:shadow-xl">
      <Card className="bg-gradient-to-r from-green-300 to-blue-400 rounded-lg p-6 transition duration-300 h-72 w-72 flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold">Fitness</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <CardDescription className="text-white text-center">
            Track your fitness objectives and monitor your progress effectively.
          </CardDescription>
        </CardContent>
        <CardFooter className="text-center text-white">Start your fitness journey</CardFooter>
      </Card>
    </Link>

    <Link to="/club/:id" className="transform transition-transform hover:scale-105 hover:shadow-xl">
      <Card className="bg-gradient-to-r from-purple-300 to-pink-400 rounded-lg p-6 transition duration-300 h-72 w-72 flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold">Club</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <CardDescription className="text-white text-center">
            Seamlessly join and manage your club activities.
          </CardDescription>
        </CardContent>
        <CardFooter className="text-center text-white">Join a club today</CardFooter>
      </Card>
    </Link>

    <Link to="/personal/:id" className="transform transition-transform hover:scale-105 hover:shadow-xl">
      <Card className="bg-gradient-to-r from-yellow-300 to-red-400 rounded-lg p-6 transition duration-300 h-72 w-72 flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold">Personal</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <CardDescription className="text-white text-center">
            Efficiently organize your personal tasks and activities.
          </CardDescription>
        </CardContent>
        <CardFooter className="text-center text-white">Manage your tasks</CardFooter>
      </Card>
    </Link>

    <Link to="/college/:id" className="transform transition-transform hover:scale-105 hover:shadow-xl">
      <Card className="bg-gradient-to-r from-blue-300 to-teal-400 rounded-lg p-6 transition duration-300 h-72 w-72 flex flex-col shadow-md">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold">College</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <CardDescription className="text-white text-center">
            Manage your college-related activities with efficiency.
          </CardDescription>
        </CardContent>
        <CardFooter className="text-center text-white">Access college resources</CardFooter>
      </Card>
    </Link>
  </div>
);
