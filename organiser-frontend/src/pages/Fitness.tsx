import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../components/ui/dialog";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../components/ui/card";

interface Exercise {
  id: number;
  name: string;
  type: string;
}

interface ExercisePlan {
  id: number;
  name: string;
  exercises: Exercise[];
  isActive: boolean;
}

const Fitness: React.FC = () => {
  const [plans, setPlans] = useState<ExercisePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<ExercisePlan | null>(null);

  // Replace fetch with dummy data
  useEffect(() => {
    const dummyPlans: ExercisePlan[] = [
      {
        id: 1,
        name: "Beginner's Workout",
        exercises: [
          { id: 1, name: "Push-ups", type: "Strength" },
          { id: 2, name: "Squats", type: "Strength" },
          { id: 3, name: "Plank", type: "Core" },
        ],
        isActive: true,
      },
      {
        id: 2,
        name: "Intermediate Cardio",
        exercises: [
          { id: 4, name: "Running", type: "Cardio" },
          { id: 5, name: "Cycling", type: "Cardio" },
        ],
        isActive: false,
      },
      {
        id: 3,
        name: "Advanced Strength Training",
        exercises: [
          { id: 6, name: "Deadlifts", type: "Strength" },
          { id: 7, name: "Bench Press", type: "Strength" },
        ],
        isActive: true,
      },
    ];
    setPlans(dummyPlans);
  }, []);

  const handlePlanClick = (plan: ExercisePlan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <Card key={plan.id} className={`cursor-pointer ${plan.isActive ? '' : 'opacity-50'}`} onClick={() => handlePlanClick(plan)}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.isActive ? "Active Plan" : "Plan Ended"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.exercises.map((exercise) => (
                <li key={exercise.id} className="flex items-center space-x-2">
                  <span>{exercise.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              View Exercises
            </button>
          </CardFooter>
        </Card>
      ))}

      {selectedPlan && (
        <Dialog open onOpenChange={() => setSelectedPlan(null)}>
          <DialogTrigger asChild>
            <button className="hidden" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPlan.name}</DialogTitle>
              <DialogDescription>
                Exercises for this plan:
              </DialogDescription>
            </DialogHeader>
            <ul className="space-y-2">
              {selectedPlan.exercises.map((exercise) => (
                <li key={exercise.id} className="flex items-center space-x-2">
                  <span>{exercise.name}</span>
                </li>
              ))}
            </ul>
            <DialogFooter>
              <DialogClose asChild>
                <button className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600">
                  Close
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Fitness;