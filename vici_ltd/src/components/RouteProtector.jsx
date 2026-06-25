import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  // Check the browser's memory for the token
  const userRole = sessionStorage.getItem("vici_user_role");

  // If there is no token, OR if their role doesn't match, kick them out!
  if (!userRole || userRole !== allowedRole) {
    return <Navigate to="/admin-login" replace />;
  }

  // If they have the right token, let them see the page (the 'children')
  return children;
}
