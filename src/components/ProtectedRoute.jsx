// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export const ProtectedRoute = ({ children, requireAuth = true, redirectTo = '/', fallback = null }) => {
//   const { user, loading, requireAuth: checkAuth } = useAuth();

//   if (loading) {
//     return fallback || (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
//       </div>
//     );
//   }

//   // If authentication is required but user is not logged in
//   if (requireAuth && !user) {
//     // Trigger auth modal instead of redirecting
//     checkAuth(redirectTo);
//     return null; // Return null while modal is shown
//   }

//   // If user is logged in but shouldn't be (for login/signup pages)
//   if (!requireAuth && user) {
//     return <Navigate to={redirectTo} replace />;
//   }

//   return children;
// };