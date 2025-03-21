import { useState, useEffect } from 'react';
import '../styles/TravelRequestDetails.css';

const TravelRequestDetails = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchTravelRequests();
  }, []);
  
  useEffect(() => {
    document.title = 'Travel Request Detail';
  }, []);
 const fetchTravelRequests = async () => {
  try {
    const token = localStorage.getItem('accessToken'); // ✅ Get token from localStorage
    console.log('Token:', token);  // Log the token to check its validity
    const response = await fetch('http://127.0.0.1:8000/travel-requests/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

    const data = await response.json();
    setRequests(data); // ✅ Set fetched data to state
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
  return (
    <div className="travel-request-details p-4">
      <h2 className="text-2xl font-bold mb-4">Travel Request Details</h2>
      {requests.length === 0 ? (
        <p>No travel requests found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Project</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Purpose</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">Travel Mode</th>
              <th className="border p-2">Ticket Booking Mode</th>
              <th className="border p-2">Start Location</th>
              <th className="border p-2">End Location</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                
                <td className="border p-2">{request.project}</td>
                <td className="border p-2">{request.username}</td>
                <td className="border p-2">{request.purpose}</td>
                <td className="border p-2">{request.start_date}</td>
                <td className="border p-2">{request.travel_mode}</td>
                <td className="border p-2">{request.ticket_booking_mode}</td>
                <td className="border p-2">{request.start_location}</td>
                <td className="border p-2">{request.end_location}</td>
                <td className="border p-2">
                  <span className={`status ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TravelRequestDetails;
// end