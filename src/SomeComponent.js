const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = 1; // Get the logged-in user's ID (you can get this dynamically)
  
    const formData = {
      user_id: userId,
      project: data.project,
      purpose: data.purpose,
      startDate: data.startDate,
      travelMode: data.travelMode,
      ticketBookingMode: data.ticketBookingMode,
      startLocation: data.startLocation,
      endLocation: data.endLocation,
    };
  
    try {
      const response = await fetch('http://localhost:8000/api/submit-travel-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        alert('Form submitted successfully!');
      } else {
        console.error('Failed to submit form:', response);
        alert('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again later.');
    }
  };
  