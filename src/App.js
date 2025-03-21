import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TravelRequestDetails from './components/TravelRequestDetails';
import { isAuthenticated } from './services/auth';

function App() {
  const { authenticated, isStaff } = isAuthenticated();

  console.log("Authenticated:", authenticated, "Is Staff:", isStaff);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          authenticated ? (
            isStaff ? <Navigate to="/admin-dashboard" replace /> : <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        } />
        <Route path="/register" element={
          authenticated ? (
            isStaff ? <Navigate to="/admin-dashboard" replace /> : <Navigate to="/dashboard" replace />
          ) : (
            <Register />
          )
        } />

        {/* Protected Routes for Staff */}
        {authenticated && isStaff && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </>
        )}

        {/* Protected Routes for Regular Users */}
        {authenticated && !isStaff && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
          </>
        )}

        {/* Shared Protected Routes */}
        {authenticated && (
          <>
            <Route path="/travel-requests/:id" element={<TravelRequestDetails />} />
            <Route path="/travel-requests" element={<TravelRequestDetails />} />
          </>
        )}

        {/* Catch-all Route */}
        <Route path="*" element={
          authenticated ? (
            isStaff ? <Navigate to="/admin-dashboard" replace /> : <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
