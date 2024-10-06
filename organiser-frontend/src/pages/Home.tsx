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
import { Dumbbell, Users, ListTodo, GraduationCap, LucideIcon } from "lucide-react";

interface CategoryCardProps {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ to, title, description, icon: Icon, gradient }) => (
  <Link to={to} className="transform transition-transform hover:scale-105 hover:shadow-xl">
    <Card className={`${gradient} rounded-lg p-6 transition duration-300 h-full w-full flex flex-col shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-xl font-semibold">{title}</CardTitle>
        <Icon className="text-white" size={24} />
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <CardDescription className="text-white text-center">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="text-center text-white">
        <span className="w-full py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors">
          Explore {title}
        </span>
      </CardFooter>
    </Card>
  </Link>
);

interface Category {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

export const Home: React.FC = () => {
  const categories: Category[] = [
    {
      to: "/fitness/:id",
      title: "Fitness",
      description: "Track your fitness objectives and monitor your progress effectively.",
      icon: Dumbbell,
      gradient: "bg-gradient-to-br from-green-400 to-emerald-600",
    },
    {
      to: "/club/:id",
      title: "Club",
      description: "Seamlessly join and manage your club activities.",
      icon: Users,
      gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    },
    {
      to: "/personal/:id",
      title: "Personal",
      description: "Efficiently organize your personal tasks and activities.",
      icon: ListTodo,
      gradient: "bg-gradient-to-br from-orange-400 to-red-600",
    },
    {
      to: "/college/:id",
      title: "College",
      description: "Manage your college-related activities with efficiency.",
      icon: GraduationCap,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Organise Your Task Here</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </div>
  );
};

export default Home;