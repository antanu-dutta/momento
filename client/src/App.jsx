import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import Signup from "./pages/Signup";
import { useState } from "react";
import DashboardInfo from "./pages/DashboardInfo";

// ✅ App Component
const App = () => {
  const [counter, setCounter] = useState();
  return (
    <>
      <Routes>
        {/* Protected Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardInfo />} />
        </Route>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
