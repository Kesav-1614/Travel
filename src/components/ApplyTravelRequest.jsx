import { useState } from 'react';
import 'animate.css';
import '../styles/applytravelrequest.css';
import { FaCheckCircle, FaPlane, FaFlag, FaCalendarAlt, FaRocket } from 'react-icons/fa';

const Dashboard = () => {
  const [stage, setStage] = useState(1);
  const [data, setData] = useState({
    project: '',
    purpose: '',
    startDate: '',
    travelMode: '',
    ticketBookingMode: '',
    startLocation: '',
    endLocation: '',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  
  // Fetch city suggestions from OpenCage API
  const fetchSuggestions = async (input, type) => {
    if (input.length < 2) {
      setSuggestions([]);
      setEndSuggestions([]);
      return;
    }

    const apiKey = '1858eac3ef5543dd92bdc615f6238e34'; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${apiKey}&limit=5`;

    try {
      const response = await fetch(url);
      const result = await response.json();

      const citySuggestions = result.results.map((result) => result.components.city || result.formatted);
      if (type === 'start') {
        setSuggestions(citySuggestions);
      } else {
        setEndSuggestions(citySuggestions);
      }
    } catch (error) {
      setError('Error fetching city suggestions. Please try again.');
    }
  };

  const handleChange = (e, type) => {
    const value = e.target.value;
    setData({ ...data, [type]: value });

    if (type === 'startLocation') {
      fetchSuggestions(value, 'start');
    } else if (type === 'endLocation') {
      fetchSuggestions(value, 'end');
    }
  };

  const handleSelectSuggestion = (city, type) => {
    setData({ ...data, [type]: city });
    if (type === 'startLocation') {
      setSuggestions([]);
    } else {
      setEndSuggestions([]);
    }
  };

  const nextStage = () => {
    if (stage < 4) setStage(stage + 1);
  };

  const prevStage = () => {
    if (stage > 1) setStage(stage - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.startLocation || !data.endLocation || !data.startDate || !data.travelMode || !data.ticketBookingMode) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/submit-travel-request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.detail); // Display success message
        console.log(result);

        // Clear form fields after successful submission
        setData({
          project: '',
          purpose: '',
          startDate: '',
          travelMode: '',
          ticketBookingMode: '',
          startLocation: '',
          endLocation: '',
        });

        setStage(1); // Reset to the first stage
        setError('');
      } else {
        const error = await response.json();
        setError(error.detail || 'Error submitting form');
      }
    } catch (error) {
      setError('Error submitting form. Please try again.');
    }
  };

  return (
    
    <div className="travel-request-form-container">
        <h2>Apply for Travel Requests</h2>
      {/* Progress Bar */}
      <div className="progress-bar">
        {[{ label: 'Type', icon: <FaFlag /> }, { label: 'Trip', icon: <FaPlane /> }, { label: 'Round', icon: <FaCalendarAlt /> }, { label: 'Submit', icon: <FaRocket /> }].map((step, index) => (
          <div
            key={index}
            className={`progress-step ${stage > index + 1 ? 'completed' : ''} ${stage === index + 1 ? 'active' : ''}`}
          >
            <div className="step-icon">{stage > index + 1 ? <FaCheckCircle /> : step.icon}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="travel-request-form">
        {stage === 1 && (
          <div className="form-stage">
            <h3>Your Project</h3>
            <input
              type="text"
              placeholder="Enter project name"
              value={data.project}
              onChange={(e) => setData({ ...data, project: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Purpose of visit"
              value={data.purpose}
              onChange={(e) => setData({ ...data, purpose: e.target.value })}
              required
            />
          </div>
        )}

        {stage === 2 && (
          <div className="form-stage">
            <h3>Travel Details</h3>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
              required
            />
            <select
              value={data.travelMode}
              onChange={(e) => setData({ ...data, travelMode: e.target.value })}
              required
            >
              <option value="">Select Travel Mode</option>
              <option value="Flight">Flight</option>
              <option value="Train">Train</option>
              <option value="Car">Car</option>
            </select>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="ticketBookingMode"
                  value="Self"
                  checked={data.ticketBookingMode === 'Self'}
                  onChange={(e) => setData({ ...data, ticketBookingMode: e.target.value })}
                />
                Self
              </label>
              <label>
                <input
                  type="radio"
                  name="ticketBookingMode"
                  value="Travel Desk"
                  checked={data.ticketBookingMode === 'Travel Desk'}
                  onChange={(e) => setData({ ...data, ticketBookingMode: e.target.value })}
                />
                Travel Desk
              </label>
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="form-stage">
            <h3>Locations</h3>
            {/* Start Location with Suggestions */}
            <input
              type="text"
              placeholder="Start location"
              value={data.startLocation}
              onChange={(e) => handleChange(e, 'startLocation')}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((city, index) => (
                  <li key={index} onClick={() => handleSelectSuggestion(city, 'startLocation')}>
                    {city}
                  </li>
                ))}
              </ul>
            )}

            {/* End Location with Suggestions */}
            <input
              type="text"
              placeholder="End location"
              value={data.endLocation}
              onChange={(e) => handleChange(e, 'endLocation')}
            />
            {endSuggestions.length > 0 && (
              <ul className="suggestions">
                {endSuggestions.map((city, index) => (
                  <li key={index} onClick={() => handleSelectSuggestion(city, 'endLocation')}>
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {stage === 4 && (
          <div className="form-stage">
            <h3>Confirm & Submit</h3>
            <p>Thank you for filling out the form! Please review your information and click submit to finalize your travel request.</p>
            <div className="summary">
              <p><strong>Project:</strong> {data.project}</p>
              <p><strong>Purpose:</strong> {data.purpose}</p>
              <p><strong>Start Date:</strong> {data.startDate}</p>
              <p><strong>Travel Mode:</strong> {data.travelMode}</p>
              <p><strong>Ticket Booking Mode:</strong> {data.ticketBookingMode}</p>
              <p><strong>Start Location:</strong> {data.startLocation}</p>
              <p><strong>End Location:</strong> {data.endLocation}</p>
            </div>
            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </div>
        )}

        {/* Error and Success Message */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Navigation Buttons */}
        <div className="navigation-buttons">
          {stage > 1 && <button type="button" onClick={prevStage}>Back</button>}
          {stage < 4 && <button type="button" onClick={nextStage}>Next</button>}
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
