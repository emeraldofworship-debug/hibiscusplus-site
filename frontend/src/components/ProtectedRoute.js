import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    // Initial auth check in progress
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--hp-cream)]">
        <p className="text-sm text-[var(--hp-muted)] uppercase tracking-[0.24em]">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
