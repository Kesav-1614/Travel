// src/services/adminService.js

export const fetchRequests = async () => {
    const response = await fetch('/api/requests'); // Adjust to your backend API endpoint
    return await response.json(); // Assuming your backend returns data in JSON format
  };
  
  export const approveRequest = async (id) => {
    await fetch(`/api/requests/approve/${id}`, { method: 'POST' }); // Adjust the API endpoint and method
  };
  
  export const declineRequest = async (id) => {
    await fetch(`/api/requests/decline/${id}`, { method: 'POST' }); // Adjust the API endpoint and method
  };
  