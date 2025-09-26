import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AdminDashboard from "@/components/AdminDashboard";
// Removed user dashboard as per requirement

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    // Check authentication on component mount
    if (!isAuthenticated || !user) {
      navigate("/");
      return;
    }
    
    // Check if user is admin
    if (user.role !== 'ADMIN') {
      navigate("/");
      return;
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading or redirect if not authenticated
  if (!isAuthenticated || !user || user.role !== 'ADMIN') {
    return null;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
};

export default Dashboard;
