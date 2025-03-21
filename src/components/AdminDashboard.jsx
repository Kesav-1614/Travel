import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting to login page
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  useEffect(() => {
    document.title = 'Admin Dashboard';
  }, []);
  // Fetch travel requests from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/get-travel-requests/');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle approval of travel request
  const handleApproval = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/update-travel-request/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Approved' }),
      });

      if (response.ok) {
        console.log(`Request ${id} approved`);
        fetchData(); // Refresh the list after approval
      } else {
        console.error(`Error approving request: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  // Handle decline of travel request
  const handleDecline = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/update-travel-request/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Declined' }),
      });

      if (response.ok) {
        console.log(`Request ${id} declined`);
        fetchData(); // Refresh the list after decline
      } else {
        console.error(`Error declining request: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // ✅ Clear token from localStorage
    navigate('/login'); // ✅ Redirect to login page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading travel requests...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Project</th>
              <th className="border px-4 py-2">Purpose</th>
              <th className="border px-4 py-2">Travel Start Date</th>
              <th className="border px-4 py-2">Travel Mode</th>
              <th className="border px-4 py-2">Ticket Booking Mode</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="border px-4 py-2">{request.id}</td>
                <td className="border px-4 py-2">{request.username}</td>
                <td className="border px-4 py-2">{request.project}</td>
                <td className="border px-4 py-2">{request.purpose}</td>
                <td className="border px-4 py-2">{request.start_date}</td>
                <td className="border px-4 py-2">{request.travel_mode}</td>
                <td className="border px-4 py-2">{request.ticket_booking_mode}</td>
                <td
                  className={`border px-4 py-2 ${
                    request.status === 'Pending'
                      ? 'text-yellow-500'
                      : request.status === 'Approved'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {request.status}
                </td>
                <td className="border px-4 py-2">
                  {request.status === 'Pending' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApproval(request.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(request.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
<br></br>
      {/* Logout Button at the Bottom */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
