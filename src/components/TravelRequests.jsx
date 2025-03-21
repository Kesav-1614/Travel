import { useEffect, useState } from 'react';
import axios from 'axios';

function TravelRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Get the travel requests from the backend API
    axios.get('http://localhost:8000/my-travel-requests/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
    }).then(res => setRequests(res.data))
      .catch(error => console.error("There was an error fetching the travel requests:", error));
  }, []);
  

  return (
    <div>
      {requests.map(request => (
        <div key={request.id}>
          <h3>{request.project}</h3>
          <p>Purpose: {request.purpose}</p>
          <p>Start Date: {request.start_date}</p>
          <p>Travel Mode: {request.travel_mode}</p>
          <p>Ticket Booking Mode: {request.ticket_booking_mode}</p>
          <p>Start Location: {request.start_location}</p>
          <p>End Location: {request.end_location}</p>
        </div>
      ))}
    </div>
  );
}

export default TravelRequests;

