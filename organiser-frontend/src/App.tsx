import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Navbar } from "./components/layout/Navbar";
import {Profile} from "./pages/Profile";
import Fitness from "./pages/Fitness";
import Club from "./pages/Club";
import Personal from "./pages/Personal";
import College from "./pages/College";
import Error from "./pages/Error";

const AppContent: React.FC = () => {
  return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900">
        <Navbar/>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/fitness/:id" element={<Fitness />} />
            <Route path="/club/:id" element={<Club />} />
            <Route path="/personal/:id" element={<Personal />} />
            <Route path="/college/:id" element={<College />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
